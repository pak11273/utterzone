import { HelloResolver } from "../resolvers/hello"
import { NotificationResolver } from "../resolvers/notification"
import { PostResolver } from "../resolvers/post"
import { ProfileResolver } from "../resolvers/profile"
import { ResourceResolver } from "../resolvers/resource"
import { UserResolver } from "../resolvers/user"
import { ZoneResolver } from "../resolvers/zone"
import { buildSchema } from "type-graphql"
import { customAuthChecker } from "../decorators/auth/custom-auth-checker"

// import { pubSub } from "../redis"

export const createSchema = () =>
  buildSchema({
    resolvers: [
      HelloResolver,
      NotificationResolver,
      PostResolver,
      ProfileResolver,
      ResourceResolver,
      UserResolver,
      ZoneResolver,
      UserResolver,
    ],
    authChecker: customAuthChecker,
    validate: false, // set true for speedier dev testing
    // pubSub, // provide redis-based instance of PubSub
  })
