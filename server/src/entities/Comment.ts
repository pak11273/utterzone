import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Comment {
  @Field({ nullable: true })
  username?: string

  @Field()
  content: string

  @Field()
  date: Date
}
