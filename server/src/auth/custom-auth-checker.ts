import { AuthChecker } from "type-graphql"
import { MyContext } from "../types"

export const customAuthChecker: AuthChecker<MyContext> = (
  // { root, args, context, info },
  { args, context },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  console.log(args)
  console.log(context.req.session.userId)
  // console.log(info)
  console.log(roles)

  return true // or false if access is denied
}
