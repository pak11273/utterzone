declare namespace NodeJS {
  export interface ProcessEnv {
    DB_DEV_USERNAME: string
    DB_TEST_USERNAME: string
    DB_PROD_USERNAME: string
    DB_DEV_PASSWORD: string
    DB_TEST_PASSWORD: string
    DB_PROD_PASSWORD: string
    DB_DEV_NAME: string
    DB_TEST_NAME: string
    DB_PROD_NAME: string
    DB_DEV_URL: string
    DB_TEST_URL: string
    DB_PROD_URL: string
    REDIS_URL: string
    REDIS_PORT: string
    PORT: string
    SESSION_SECRET: string
    CORS_ORIGIN: string
  }
}
