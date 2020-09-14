import dontenv from "dotenv-safe"

dontenv.config()

export const prodConfig = {
  DB_USERNAME: process.env.DB_PROD_USERNAME,
  DB_DATABASE: process.env.DB_PROD_DATABASE,
}
