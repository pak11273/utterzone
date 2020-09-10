import { Authorized, Field, ID, InputType } from "type-graphql"

import { Message } from "../../entities/Message"

@InputType()
export class MessageInput implements Partial<Message> {
  @Field(_type => ID)
  zone: string

  @Authorized()
  @Field()
  username?: string

  @Field()
  content: string
}
