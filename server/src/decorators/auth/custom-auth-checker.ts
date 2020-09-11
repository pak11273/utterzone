import { AuthChecker } from "type-graphql"
import { MyContext } from "../../types"

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

  // JOINING A ROOM AUTH
  // check DB if user is in zone already
  // if already in zone return error
  // if banned deny zone token and access
  // rate limit this function

  // MESSAGING IN ZONE
  // only particpants can message in zone
  // particpants cannot message to users that have blocked them
  // hosts can put people on time - they won't be able to send messages

  // UTTERZONE ADMINS SHOULD ALWAYS HAVE ACCESS

  return true // or false if access is denied
}
