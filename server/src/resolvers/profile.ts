import { FieldResolver, Resolver } from "type-graphql"

import { Profile } from "../entities/Profile"

@Resolver(Profile)
export class ProfileResolver {
  @FieldResolver(() => String)
  removeMe() {
    return "remove Me"
  }
}
