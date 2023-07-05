ormConfig = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.BD_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/domain/model/**.ts"],
  migrations: ["src/domain/repository/migrations/**.ts"],
};

module.exports = ormConfig
