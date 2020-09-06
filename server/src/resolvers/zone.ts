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

import { ZONE_PREFIX } from "../constants"
import { v4 } from "uuid"
// import { ZoneEvent, ZonePayload } from "../entities/Zone"
import { Comment } from "../entities/Comment"
import { NewCommentPayload } from "../shared/interfaces/newComment.interface"
import { NewZoneArgs } from "../shared/args/zone.resolver.args"
// import { Recipe } from "../entities/recipe"
import { Zone } from "../entities/Zone"

import { Message } from "../entities/Message"
import { MyContext } from "../types"
import { Topic } from "../types/Topic"
// import { sampleRecipes } from "../data/recipe.samples"

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
  zoneId: string

  @Field({ nullable: true })
  username?: string

  @Field()
  content: string
}

// enum Topic {
//   NewMessage = "NEW_MESSAGE",
//   NewZone = "NEW_ZONE",
// }
// interface NewMessagePayload {
//   zoneId: string
//   dateString: string // limitation of Redis payload serialization
//   content: string
//   username?: string
// }

@ArgsType()
export class NewMessagesArgs {
  @Field(_type => ID)
  zoneId: string
}
@Resolver()
export class ZoneResolver {
  // private readonly recipes: Recipe[] = sampleRecipes.slice()
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
    @Ctx() { redis, req }: MyContext
  ): Promise<Zone> {
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

    let token = v4()
    let amendedInput: any = {
      id: 0,
      app: "youglish",
      name: input.name,
      premium: false,
      mature: true,
      public: true,
      maxParticipants: input.maxParticipants,
      totalParticipants: 0,
      hostId: req.session.userId,
      zoneId: token,
      password: input.password,
    }

    let zone = await redis.hmset(ZONE_PREFIX + token, {
      ...amendedInput,
    })

    // TODO: validations

    if (!zone) {
      throw new ApolloError("There was an error.  Zone not created.")
    }
    console.log("amend: ", amendedInput)

    return amendedInput
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
    @PubSub(Topic.NewMessage)
    notifyAboutNewComment: Publisher<NewCommentPayload>
  ): Promise<boolean> {
    const comment: Comment = {
      content: input.content,
      nickname: input.nickname,
      date: new Date(),
    }
    await notifyAboutNewComment({
      content: comment.content,
      nickname: comment.nickname,
      dateString: comment.date.toISOString(),
      name: input.name,
    })
    return true
  }

  @Subscription(_returns => Comment, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NewCommentPayload, NewZoneArgs>) => {
      console.log("args: ", args)
      console.log("payload: ", payload)
      return payload.name === args.name
    },
  })
  createZoneSubscription(
    @Root() newComment: NewCommentPayload,
    @Args() { name }: NewZoneArgs
  ): Comment {
    console.log("name: ", name)
    return {
      content: newComment.content!,
      date: new Date(newComment.dateString), // limitation of Redis payload serialization
      nickname: newComment.nickname,
    }
  }
}
