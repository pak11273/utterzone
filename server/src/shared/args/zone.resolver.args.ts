import { ArgsType, Field, ID } from "type-graphql"

@ArgsType()
export class NewZoneArgs {
  @Field(_type => ID)
  name: string
}
