import "reflect-metadata"

import { Comment } from "../../entities/Comment"
import { Course } from "../../entities/Course"
import { Message } from "../../entities/Message"
import { Notification } from "../../entities/Notification"
import { Post } from "../../entities/Post"
import { Profile } from "../../entities/Profile"
import { Resource } from "../../entities/Resource"
import { Updoot } from "../../entities/Updoot"
import { User } from "../../entities/User"
import { Zone } from "../../entities/Zone"
import { __prod__ } from "../../constants"
import { config } from "../../config"
import { createConnection } from "typeorm"

require("dotenv").config()

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: "utterzone-test",
    migrations: ["dist/migrations/*.js"],
    synchronize: true,
    dropSchema: drop,
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
}
