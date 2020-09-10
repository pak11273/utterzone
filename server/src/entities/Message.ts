import { Field, ObjectType } from "type-graphql"

import { Zone } from "./Zone"

@ObjectType()
export class Message {
  @Field()
  message: string

  @Field()
  username: string

  @Field()
  zone: string

  @Field(() => String)
  createdAt: Date
}
