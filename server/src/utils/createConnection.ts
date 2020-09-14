import { config } from "../config"
import { createConnection as createConn } from "typeorm"
import dontenv from "dotenv-safe"

dontenv.config()

export const createConnection = (drop: boolean = false) => {
  return createConn({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: "utterzone-test",
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"],
    synchronize: drop,
    dropSchema: drop,
  })
}
