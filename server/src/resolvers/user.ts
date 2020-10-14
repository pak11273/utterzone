import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
  UseMiddleware,
  Subscription,
  // Args,
} from "type-graphql"
import { MyContext } from "../types"
import { User } from "../entities/User"
import argon2 from "argon2"
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, USER_PREFIX } from "../constants"
import { UsernamePasswordInput } from "../shared/inputs/UsernamePasswordInput"
import { validateCreateUser } from "../utils/validateCreateUser"
import { sendEmail } from "../utils/sendEmail"
import { v4 } from "uuid"
import { getConnection } from "typeorm"
// import { rateLimit, resolveTime } from "../middleware"
import { ApolloError } from "apollo-server-express"
import { __prod__ } from "../constants"

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
class UserStatus {
  @Field()
  status: String
}

const removeUserFromRedis = async (redis: any, username: any) => {
  await redis.hdel(USER_PREFIX, username)
}

class UserStatusPayload {
  status: string
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email
    }
    // current user wants to see someone elses email
    return ""
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  @Query(() => User)
  async user(@Arg("id") id: number): Promise<User | undefined> {
    const user = await User.findOne(id)
    if (user) user.profile
    return user
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 2",
          },
        ],
      }
    }

    const key = FORGET_PASSWORD_PREFIX + token
    const userId = await redis.get(key)
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      }
    }

    const user = await User.findOne(userId)

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      }
    }

    await User.update(
      { id: userId },
      {
        password: await argon2.hash(newPassword),
      }
    )

    await redis.del(key)

    // log in user after change password
    req.session.userId = user.id
    req.session.userName = user.username

    return { user }
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      // the email is not in the db
      return false
    }

    const token = v4()

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ) // 3 days

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    )

    return true
  }

  @Mutation(() => UserResponse)
  @UseMiddleware()
  // resolveTime,
  // rateLimit({
  //   limitAnon: 50,
  //   limitUser: 50,
  //   msgAnon: "Too many failed attempts.  Try again in an hour.",
  //   msgUser: "Too many failed attempts.  Try again in an hour.",
  //   time: "hour",
  //   multiplier: 1,
  // })
  async createUser(
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateCreateUser(input)
    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(input.password)
    let user

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: input.username.toLowerCase(),
          email: input.email.toLowerCase(),
          password: hashedPassword,
        })
        .returning("*")
        .execute()
      user = result.raw[0]
    } catch (err) {
      // duplicate username error
      if (err.detail) {
        if (err.detail.includes("user") && err.detail.includes("already")) {
          return {
            errors: [
              {
                field: "username",
                message: "username already taken",
              },
            ],
          }
        }
        if (err.detail.includes("email") && err.detail.includes("already")) {
          return {
            errors: [
              {
                field: "email",
                message: "email already taken",
              },
            ],
          }
        }
      }
      return err
    }

    req.session.userId = user.id
    req.session.userName = user.username

    return { user }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware()
  // resolveTime
  // rateLimit({
  //   limitAnon: 50,
  //   limitUser: 0,
  //   msgAnon: "Too many failed attempts.  Try again in an hour.",
  //   msgUser: "You are already logged in.",
  //   time: "hour",
  //   multiplier: 1,
  // })
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    )

    if (!user) {
      throw new ApolloError("That user doesn't exist")
    }

    const valid = await argon2.verify(user.password, password)

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      }
    }

    req.session.userId = user.id
    req.session.username = user.username

    return {
      user,
    }
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(resolveTime)
  async logout(@Ctx() { redis, req, res }: MyContext) {
    await removeUserFromRedis(redis, req.session.username)

    return new Promise(resolve =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          console.log(err)
          resolve(false)
          return
        }

        resolve(true)
      })
    )
  }

  @Subscription({
    topics: ({ context }) => context.session.username,
  })
  userStatus(
    @Root() userStatusPayload: UserStatusPayload,
    @Arg("status") status: string
  ): UserStatus {
    return {
      ...userStatusPayload,
      status,
    }
  }
}
