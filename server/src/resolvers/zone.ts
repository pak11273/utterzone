import {
  Field,
  InputType,
  Resolver,
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
// import { getConnection } from "typeorm"
import { isAuth } from "../middleware/isAuth"
import { messages } from "../db/mock"
import { validateZone } from "../utils/validateZone"
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
export class ZoneInput {
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

  @Mutation(() => Zone)
  @UseMiddleware(isAuth)
  async createZone(
    @Arg("input") input: ZoneInput,
    @Ctx() { req }: MyContext
  ): Promise<Zone> {
    const errors = validateZone(input)
    if (errors) {
      {
        errors
      }
    }
    if (input.public) {
      const hashedPassword = await argon2.hash(input.password)
      input.password = hashedPassword
    }
    console.log("input: ", input)
    const zone = await Zone.create({
      ...input,
      hostId: req.session.userId,
    }).save()
    // TODO: validations

    if (!zone) {
      throw new ApolloError("There was an error.  Zone not created.")
    }

    console.log(zone)
    return zone
  }
}
