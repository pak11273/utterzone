module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "utterzone",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
}
