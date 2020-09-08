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
  ArgsType,
  Publisher,
  ResolverFilterData,
  Root,
  Args,
} from "type-graphql"

// import { ZONE_PREFIX } from "../constants"
// import { v4 } from "uuid"
// import { ZoneEvent, ZonePayload } from "../entities/Zone"
import { Comment } from "../entities/Comment"
import { NewCommentPayload } from "../shared/interfaces/newComment.interface"
import { NewZoneArgs } from "../shared/args/zone.resolver.args"
// import { Resource } from "../entities/Resource"
import { Zone } from "../entities/Zone"

import { Message } from "../entities/Message"
import { MyContext } from "../types"
import { Topic } from "../types/Topic"
// import { sampleResources } from "../data/Resource.samples"

import argon2 from "argon2"
// import { getConnection } from "typeorm"
import { isAuth } from "../middleware/isAuth"
import { messages } from "../db/mock"
// import { validateZone } from "../utils/validateZone"
import { ApolloError } from "apollo-server-express"
import { ZoneInput } from "../shared/inputs/zone.input"
import { CommentInput } from "../shared/inputs/comment.input"

// import { User } from "../entities/User"

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
  @Field(_type => ID)
  token: string

  @Field({ nullable: true })
  username?: string

  @Field()
  content: string
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

@ArgsType()
export class ZoneMessagesArgs {
  @Field(_type => ID)
  token: string
}
@Resolver()
export class ZoneResolver {
  // private readonly Resources: Resource[] = sampleResources.slice()
  // private autoIncrement = 0
  @Query(() => Zone, { nullable: true })
  async zone(
    @Arg("id") id: number,
    @Ctx() {}: MyContext
  ): Promise<Zone | undefined> {
    const zone = await Zone.findOne(id)
    return zone
  }

  @Query(_type => [Zone])
  async zones(@Ctx() {}: MyContext): Promise<any | undefined> {
    try {
      const zones = await Zone.find()
      return zones
    } catch (err) {
      console.log("error: ", err)
      throw new ApolloError(err)
    }
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

  @Mutation(() => Zone)
  @UseMiddleware(isAuth)
  async createZone(
    @Arg("input") input: ZoneInput,
    @Ctx() {}: MyContext
  ): Promise<Zone> {
    try {
      console.log("input: ", input)
      // const errors = validateZone(input)
      // if (errors) {
      //   {
      //     errors
      //   }
      // }

      if (input.public) {
        const hashedPassword = await argon2.hash("narcotics") // TODO: make dynamic
        input.password = hashedPassword
      }
      const zone = await Zone.create(input).save()

      // TODO: validations

      if (!zone) {
        throw new ApolloError("There was an error.  Zone not created.")
      }

      console.log("zone ster: ", zone)

      return zone
    } catch (err) {
      throw new ApolloError("rut roh raggy")
    }
  }

  // TODO: messages

  // @Mutation(_returns => Boolean)
  // @UseMiddleware(resolveTime)
  // async createZoneMessageMutation(
  //   @PubSub()
  //   @Ctx()
  //   { redis }: MyContext,
  //   @Arg("topic")
  //   topic: string,
  //   @Arg("message", { nullable: true }) message: string
  // ): Promise<boolean> {
  //   await redis.publish(topic, message)
  //   return true
  // }

  @Mutation(_returns => Boolean)
  async createZoneMessageMutation(
    @Arg("message") input: CommentInput,
    @PubSub(Topic.ZoneMessage)
    notifyAboutNewComment: Publisher<NewCommentPayload>
  ): Promise<boolean> {
    const comment: Comment = {
      content: input.content,
      username: input.username,
      date: new Date(),
    }
    await notifyAboutNewComment({
      content: comment.content,
      username: comment.username,
      dateString: comment.date.toISOString(),
      name: input.name,
    })
    return true
  }

  @Subscription(_returns => Comment, {
    topics: Topic.ZoneMessage,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NewCommentPayload, NewZoneArgs>) => {
      console.log("args: ", args)
      console.log("payload: ", payload)
      return payload.name === args.token
    },
  })
  createZonePub(
    @Root() newComment: NewCommentPayload,
    @Args() { token }: NewZoneArgs
  ): Comment {
    console.log("token: ", token)
    return {
      content: newComment.content!,
      date: new Date(newComment.dateString), // limitation of Redis payload serialization
      username: newComment.username,
    }
  }
}
