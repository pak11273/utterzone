import { Field, ID, InputType } from "type-graphql"

import { Comment } from "../../entities/Comment"

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field(_type => ID)
  name: string

  @Field({ nullable: true })
  username?: string

  @Field()
  content: string
}
