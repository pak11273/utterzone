import { Field, InputType } from "type-graphql"

import { Length } from "class-validator"

@InputType()
export class ZoneInput {
  @Field()
  @Length(8, 30)
  name: string

  @Field({ nullable: true })
  @Length(2, 300)
  password: string

  @Field({ nullable: true })
  app: string

  @Field()
  hostname: string

  @Field()
  learningLanguage?: string

  @Field()
  nativeLanguage?: string

  @Field()
  maxParticipants?: number

  @Field({ nullable: true, defaultValue: "Practice with us!" })
  description: string

  @Field({ defaultValue: true })
  public: boolean

  @Field({ defaultValue: false })
  mature: boolean

  @Field({ defaultValue: false })
  premium: boolean
}
