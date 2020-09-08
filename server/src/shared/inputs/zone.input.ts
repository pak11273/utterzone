import { Field, InputType } from "type-graphql"

@InputType()
export class ZoneInput {
  @Field()
  name: string

  @Field({ nullable: true })
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
