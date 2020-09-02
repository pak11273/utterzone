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
} from "type-graphql"

import { ZONE_PREFIX } from "../constants"
import { v4 } from "uuid"

import { Zone } from "../entities/Zone"

import { Message } from "../entities/Message"
import { MyContext } from "../types"

import argon2 from "argon2"
// import { getConnection } from "typeorm"
import { isAuth } from "../middleware/isAuth"
import { messages } from "../db/mock"
// import { validateZone } from "../utils/validateZone"
import { ApolloError } from "apollo-server-express"

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

@InputType()
export class ZoneInput {
  @Field()
  name: string

  @Field({ nullable: true })
  description: string

  @Field()
  public: boolean

  @Field()
  mature: boolean

  @Field({ nullable: true })
  password: string

  @Field()
  learningLanguage: string

  @Field()
  nativeLanguage: string

  @Field()
  maxParticipants: number
}

enum Topic {
  NewMessage = "NEW_MESSAGE",
  NewZone = "NEW_ZONE",
}
interface NewMessagePayload {
  zoneId: string
  dateString: string // limitation of Redis payload serialization
  content: string
  username?: string
}

@ArgsType()
export class NewMessagesArgs {
  @Field(_type => ID)
  zoneId: string
}
@Resolver()
export class ZoneResolver {
  @Query(() => Zone, { nullable: true })
  async zone(
    @Arg("id") id: number,
    @Ctx() {}: MyContext
  ): Promise<Zone | undefined> {
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
      const hashedPassword = await argon2.hash(input.password)
      input.password = hashedPassword
    }

    let token = v4()
    let amendedInput: any = {
      id: 0,
      name: input.name,
      premium: false,
      maxParticipants: input.maxParticipants,
      totalParticipants: 0,
      hostId: req.session.userId,
      zoneId: token,
      password: input.password,
      app: "youglish",
    }
    // redis.hmset(ZONE_PREFIX, amendedInput)
    let zone = await redis.hmset(ZONE_PREFIX + token, {
      ...amendedInput,
    })

    // TODO: validations

    if (!zone) {
      throw new ApolloError("There was an error.  Zone not created.")
    }

    return amendedInput
  }

  // TODO: messages

  @Mutation(_returns => Boolean)
  async addNewMessage(
    @Arg("message") input: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<NewMessagePayload>
  ): Promise<boolean> {
    const zone: any = await Zone.findOne(input.zoneId)
    if (!zone) {
      throw new ApolloError("No zone found with this id")
    }

    const message: Message | any = {
      content: input.content,
      username: input.username,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // zone.messages.push(message)

    await notifyAboutNewMessage({
      content: message.content,
      username: message.username,
      dateString: message.createdAt.toISOString(),
      zoneId: input.zoneId,
    })
    return true
  }

  @Subscription(_returns => Message, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NewMessagePayload, NewMessagesArgs>) => {
      return payload.zoneId === args.zoneId
    },
  })
  newMessages(
    @Root() newMessage: NewMessagePayload
    // @Args() { zoneId }: NewMessagesArgs
  ): Message | any {
    return {
      content: newMessage.content,
      createdAt: new Date(newMessage.dateString), // limitation of Redis payload serialization
      username: newMessage.username,
    }
  }
}
