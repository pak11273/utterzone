import "reflect-metadata"
import "dotenv-safe/config"

import { redis, redisSession } from "./redis"

import { ApolloServer } from "apollo-server-express"
import { HelloResolver } from "./resolvers/hello"
import { Message } from "./entities/Message"
import { Organization } from "./entities/Organization"
import { Post } from "./entities/Post"
import { PostResolver } from "./resolvers/post"
import { Updoot } from "./entities/Updoot"
import { User } from "./entities/User"
import { UserResolver } from "./resolvers/user"
import { Zone } from "./entities/Zone"
import { __prod__ } from "./constants"
import { buildSchema } from "type-graphql"
import cors from "cors"
import { createConnection } from "typeorm"
import { createUpdootLoader } from "./utils/createUpdootLoader"
import { createUserLoader } from "./utils/createUserLoader"
import express from "express"
import path from "path"

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Message, Organization, Post, User, Updoot, Zone],
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
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
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

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:5000")
  })
}

main().catch(err => {
  console.error(err)
})
