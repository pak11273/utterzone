import {
  Mutation,
  Resolver,
  InputType,
  Field,
  Arg,
  Ctx,
  UseMiddleware,
  ObjectType,
  Query,
  // Int,
} from "type-graphql"

import { messages } from "../db/mock"

import { Zone } from "../entities/Zone"
import { MyContext } from "../types"
import { isAuth } from "../middleware/isAuth"
import { validateZone } from "../utils/validateZone"
import { Message } from "../entities/Message"
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
  username: string
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
