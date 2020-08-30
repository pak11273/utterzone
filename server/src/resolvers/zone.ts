import {
  Field,
  InputType,
  Resolver,
  ObjectType,
  Query,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
} from "type-graphql"

import { Zone } from "../entities/Zone"

import { Message } from "../entities/Message"
import { MyContext } from "../types"


import argon2 from "argon2"
import { getConnection } from "typeorm"
import { isAuth } from "../middleware/isAuth"
import { messages } from "../db/mock"
import { validateZone } from "../utils/validateZone"

// import { User } from "../entities/User"

// import { MixinFieldError } from "../shared/mixins/MixinFieldError"

@ObjectType()
class FieldErrors {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class ZoneResponse {
  @Field(() => [FieldErrors], { nullable: true })
  errors?: FieldErrors[]
  @Field(() => Zone, { nullable: true })
  zone?: Zone
}

@InputType()
export class ZoneInput {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  public: boolean

  @Field()
  password: string

  @Field()
  learningLanguage: string

  @Field()
  nativeLanguage: string

  @Field()
  maxParticipants: number
}

@Resolver() 
export class ZoneResolver {
  @Query(() => Zone, { nullable: true })
  async zone(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<Zone | undefined> {
    console.log("sessionid: ", req.sessionID)
    const zone = await Zone.findOne(id)
    return zone
  }

  @Query(() => [Zone])
  async zones(): Promise<Zone[] | undefined> {
    const zones = await Zone.find()
    return zones
  }

  @Query(() => Message)
  async messages(zone: any) {
    return messages.filter(m => zone.messages.includes(m.id))
  }

  @Query(() => Message)
  async lastMessage(zone: any) {
    const lastMessage = zone.messages[zone.messages.length - 1]
    return messages.find(m => m.id === lastMessage)
  }

  @Mutation(() => ZoneResponse)
  @UseMiddleware(isAuth)
  async createZone(
    @Arg("input") input: ZoneInput,
    @Ctx() { req }: MyContext
  ): Promise<ZoneResponse> {
    const errors = validateZone(input)
    if (errors) {
      return { errors }
    }
    const hashedPassword = await argon2.hash(input.password)
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Zone)
        .values({
        // lastMessage: input.lastMessage, 
        learningLanguage: input.learningLanguage,
        nativeLanguage: input.nativeLanguage,
        maxParticipants: input.maxParticipants ,
          name: input.name.toLowerCase(),
          description: input.description,
          password: hashedPassword,
          public: input.public
        })
        .returning("*")
        .execute()

      return result.raw[0]

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
    // if id exists then return duplicate error
    // if user.id doesn't exist then return error
    // create a new zone record
    //   return await Zone.create({
    //     ...input,
    //     hostId: req.session.user.id,
    //   }).save()
    // } catch (err) {
    //   console.log(err)
    // return err
    console.log(req)
    return {}
 }
}
