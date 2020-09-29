require("dotenv").config()

export const prodConfig = {
  DB_USERNAME: process.env.DB_PROD_USERNAME,
  DB_PASSWORD: process.env.DB_PROD_PASSWORD,
  DB_NAME: process.env.DB_PROD_NAME,
  DB_URL: process.env.DB_PROD_URL,
}
