// apollo-server-expresss subscription setup
// ref: https://github.com/apollographql/apollo-server/issues/1902

import "reflect-metadata"

import { redis, redisSession } from "./redis"

import { ApolloServer } from "apollo-server-express"
import { Comment } from "./entities/Comment"
import { Course } from "./entities/Course"
import { Message } from "./entities/Message"
import { Notification } from "./entities/Notification"
import { Post } from "./entities/Post"
import { Profile } from "./entities/Profile"
import { Resource } from "./entities/Resource"
import { Updoot } from "./entities/Updoot"
import { User } from "./entities/User"
import { Zone } from "./entities/Zone"
import { __prod__ } from "./constants"
import { config } from "./config"
import cors from "cors"
import { createConnection } from "typeorm"
import { createSchema } from "./utils/createSchema"
import { createUpdootLoader } from "./utils/createUpdootLoader"
import { createUserLoader } from "./utils/createUserLoader"
import express from "express"
import http from "http"
import path from "path"

require("dotenv").config()

const main = async () => {
  const schema = await createSchema()

  const conn = await createConnection({
    type: "postgres",
    url: config.DB_URL,
    logging: false,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      Comment,
      Course,
      Message,
      Notification,
      Profile,
      Post,
      Resource,
      User,
      Updoot,
      Zone,
    ],
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
    schema,

    // await buildSchema({
    //   resolvers: [
    //     HelloResolver,
    //     NotificationResolver,
    //     PostResolver,
    //     ProfileResolver,
    //     ResourceResolver,
    //     UserResolver,
    //     ZoneResolver,
    //     CourseResolver,
    //   ],
    //   authChecker: customAuthChecker,
    //   validate: false, // set true for speedier dev testing
    //   pubSub, // provide redis-based instance of PubSub
    // }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(parseInt(process.env.PORT), () => {
    console.log(`🚀 Environment: ${process.env.NODE_ENV}`)
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
