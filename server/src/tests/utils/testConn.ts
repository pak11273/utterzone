import { config } from "../../config"
import { createConnection } from "typeorm"
import dontenv from "dotenv-safe"

dontenv.config()

export const testConn = (drop: boolean = false) => {
  return createConnection({
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
