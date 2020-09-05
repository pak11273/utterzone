import { Field, InputType } from "type-graphql"

@InputType()
export class ZoneInput {
  @Field()
  name: string

  @Field()
  username: string

  @Field()
  password: string

  @Field({ nullable: true })
  app: string

  @Field()
  hostId: number

  @Field()
  zoneId: string

  @Field()
  participants: number

  @Field()
  learningLanguage?: string

  @Field()
  nativeLanguage?: string

  @Field()
  maxParticipants?: number

  @Field({ nullable: true })
  description: string

  @Field()
  public: boolean

  @Field()
  mature: boolean

  @Field()
  premium: boolean
}
