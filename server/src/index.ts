// apollo-server-expresss subscription setup
// ref: https://github.com/apollographql/apollo-server/issues/1902

import "reflect-metadata"
import "dotenv-safe/config"

import { pubSub, redis, redisSession } from "./redis"

import { ApolloServer } from "apollo-server-express"
import { HelloResolver } from "./resolvers/hello"
import { Message } from "./entities/Message"
import { Notification } from "./entities/Notification"
import { NotificationResolver } from "./resolvers/notification"
import { Post } from "./entities/Post"
import { PostResolver } from "./resolvers/post"
import { Profile } from "./entities/Profile"
import { ProfileResolver } from "./resolvers/profile"
import { Updoot } from "./entities/Updoot"
import { User } from "./entities/User"
import { UserResolver } from "./resolvers/user"
import { Zone } from "./entities/Zone"
import { ZoneResolver } from "./resolvers/zone"
import { __prod__ } from "./constants"
import { buildSchema } from "type-graphql"
import cors from "cors"
import { createConnection } from "typeorm"
import { createUpdootLoader } from "./utils/createUpdootLoader"
import { createUserLoader } from "./utils/createUserLoader"
import express from "express"
import http from "http"
import path from "path"

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Message, Notification, Profile, Post, User, Updoot, Zone],
  })
  await conn.runMigrations()

  // await Post.delete({});

  const app = express()

  app.set("trust proxy", 1)

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )

  app.use(redisSession)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        NotificationResolver,
        PostResolver,
        ProfileResolver,
        UserResolver,
        ZoneResolver,
      ],
      validate: false,
      pubSub, // provide redis-based instance of PubSub
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(parseInt(process.env.PORT), () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`
    )
  })
}

main().catch(err => {
  console.error(err)
})
