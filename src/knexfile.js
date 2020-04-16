/*eslint-disable */
const { knexSnakeCaseMappers } = require("objection");

require("dotenv").config({ path: "../.env" });

module.exports = {
  client: "mysql",
  connection: {
    database: "my_database",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  ...knexSnakeCaseMappers(),
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "../migrations",
    tableName: "knex_migrations",
  },
};
