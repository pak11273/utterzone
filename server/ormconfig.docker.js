module.exports = {
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "utterzone-prod",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
}
