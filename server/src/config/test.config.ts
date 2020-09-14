import dontenv from "dotenv-safe"

dontenv.config()

export const testConfig = {
  DB_USERNAME: process.env.DB_TEST_USERNAME,
  DB_DATABASE: process.env.DB_TEST_DATABASE,
}
