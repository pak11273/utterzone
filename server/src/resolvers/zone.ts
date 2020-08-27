import {
  Mutation,
  // Query,
  Resolver,
  InputType,
  Field,
  Arg,
  Ctx,
  UseMiddleware,
  ObjectType,
} from "type-graphql"

import { Zone } from "../entities/Zone"
import { MyContext } from "../types"
import { isAuth } from "../middleware/isAuth"
import { validateZone } from "../utils/validateZone"
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
  // @Query(() => Zone, { nullable: true })
  // async zone(@Arg("id", () => Int) id: number): Promise<Zone | undefined> {
  //   const zone = await Zone.findOne(id)
  //   return zone
  // }

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
