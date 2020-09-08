import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class NewZoneArgs {
  @Field(_type => String)
  token: string
}
