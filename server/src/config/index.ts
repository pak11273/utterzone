import { prodConfig } from "./prod.config"
import { testConfig } from "./test.config"

// defaults will be for set to development
const defaults = {
  DB_USERNAME: process.env.DB_DEV_USERNAME,
  DB_PASSWORD: process.env.DB_DEV_PASSWORD,
  DB_NAME: process.env.DB_DEV_NAME,
  DB_URL: process.env.DB_DEV_URL,
}

export const combineConfigs = () => {
  let prod =
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
      ? prodConfig
      : {}
  let test =
    process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test"
      ? testConfig
      : {}

  return {
    ...defaults,
    ...test,
    ...prod,
  }
}

export const config = combineConfigs()
