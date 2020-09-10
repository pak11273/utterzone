import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Message {
  @Field()
  zone: string

  @Field()
  username: string

  @Field()
  message: string

  @Field()
  createdAt: Date
}
