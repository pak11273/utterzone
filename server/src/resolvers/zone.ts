// import { resolveTime } from "../middleware/resolveTime"
import {
  Field,
  InputType,
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
  ID,
  PubSub,
  Subscription,
  // ArgsType,
  Publisher,
  ResolverFilterData,
  Root,
  Args,
  Authorized,
} from "type-graphql"

// import { ZONE_PREFIX } from "../constants"
// import { v4 } from "uuid"
// import { ZoneEvent, ZonePayload } from "../entities/Zone"
// import { Comment } from "../entities/Comment"
// import { NewCommentPayload } from "../shared/interfaces/newComment.interface"
import { NewMessagePayload } from "../shared/interfaces/newMessage.interface"
import { NewZoneArgs } from "../shared/args/zone.resolver.args"
// import { Resource } from "../entities/Resource"
import { Zone } from "../entities/Zone"

import { Message } from "../entities/Message"
import { MyContext } from "../types"
import { Topic } from "../shared/enums/Topic"
// import { sampleResources } from "../data/Resource.samples"

import argon2 from "argon2"
// import { getConnection } from "typeorm"
import { isAuth } from "../middleware/isAuth"
// import { messages } from "../db/mock"
// import { validateZone } from "../utils/validateZone"
import { ApolloError } from "apollo-server-express"
import { ZoneInput } from "../shared/inputs/zone.input"
// import { CommentInput } from "../shared/inputs/comment.input"

import { User } from "../entities/User"
import { getManager } from "typeorm"
import { Test } from "../decorators/auth/authTest"

// import { MixinFieldError } from "../shared/mixins/MixinFieldError"

// @ObjectType()
// class FieldErrors {
//   @Field()
//   field: string
//   @Field()
//   message: string
// }

// @ObjectType()
// class ZoneResponse {
//   @Field(() => [FieldErrors], { nullable: true })
//   errors?: FieldErrors[]
//   @Field(() => Zone, { nullable: true })
//   zone?: Zone
// }
@InputType()
export class MessageInput implements Partial<Message> {
  @Field(_type => ID, { defaultValue: "xyz" })
  token?: string

  @Field({ nullable: true })
  username?: string

  @Field()
  message: string

  @Field()
  zone: string
}

// enum Topic {
//   ZoneMessage = "NEW_MESSAGE",
//   NewZone = "NEW_ZONE",
// }
// interface ZoneMessagePayload {
//   token: string
//   dateString: string // limitation of Redis payload serialization
//   content: string
//   username?: string
// }

@Resolver()
export class ZoneResolver {
  // private readonly Resources: Resource[] = sampleResources.slice()
  // private autoIncrement = 0
  @Query(() => Zone, { nullable: true })
  async zone(
    @Arg("id") id: string,
    @Ctx() {}: MyContext
  ): Promise<Zone | undefined> {
    const zone = await Zone.findOne({ id: id })
    return zone
  }

  @Test()
  @Query(_type => [Zone])
  async zones(@Ctx() {}: MyContext): Promise<any | undefined> {
    try {
      const zones = await Zone.find()
      return zones
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Mutation(_type => Zone)
  @Test()
  async joinZone(
    @Arg("id") id: string,
    @Ctx() { req }: MyContext
  ): Promise<any | undefined> {
    try {
      console.log("id: ", id)
      req.session.zoneId = id
      return {
        id: id,
      }
    } catch (err) {
      return err
    }
  }

  @Mutation(() => Zone)
  @UseMiddleware(isAuth)
  async createZone(
    @Arg("input") input: ZoneInput,
    @Ctx() { req }: MyContext
  ): Promise<Zone> {
    try {
      const manager = getManager()
      const user = await manager.findOne(User, req.session.userId)

      if (input.public) {
        const hashedPassword = await argon2.hash("narcotics") // TODO: make dynamic
        input.password = hashedPassword
      }

      console.log("input: ", input)
      // const zone = new Zone()
      // zone.save(input)
      const zone = await Zone.create(input).save()
      user!.zone = zone
      await manager.save(user)

      if (!zone) {
        throw new ApolloError("There was an error.  Zone not created.")
      }

      return zone
    } catch (err) {
      return err
    }
  }

  @Authorized()
  @Mutation(_returns => Boolean)
  async createZoneMessageMutation(
    @Arg("message")
    input: MessageInput,
    @PubSub(Topic.ZoneToken)
    publish: Publisher<NewMessagePayload>
  ): Promise<boolean> {
    try {
      await publish({
        message: input.message,
        token: input.token,
        zone: input.zone,
        date: new Date(),
      })
      return true
    } catch (err) {
      throw new ApolloError(err)
    }
  }

  @Subscription(_returns => Message, {
    topics: Topic.ZoneToken,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NewMessagePayload, NewZoneArgs>) => {
      console.log("args: ", args)
      console.log("payload: ", payload)
      return payload.token === args.token
    },
  })
  createZonePub(
    @Root() newMessage: NewMessagePayload,
    @Args() { token }: NewZoneArgs
  ): Message {
    console.log("token: ", token)
    console.log("message: ", newMessage.message)

    return {
      message: newMessage.message,
      createdAt: new Date(), // limitation of Redis payload serialization
      zone: newMessage.zone,
      username: newMessage.username || "",
    }
  }
}
