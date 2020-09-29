require("dotenv").config()

export const testConfig = {
  DB_USERNAME: process.env.DB_TEST_USERNAME,
  DB_PASSWORD: process.env.DB_TEST_PASSWORD,
  DB_NAME: process.env.DB_TEST_NAME,
  DB_URL: process.env.DB_TEST_URL,
}
