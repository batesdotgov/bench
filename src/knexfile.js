module.exports = {
  development: {
    debug: true,
    client: "mysql",
    connection: {
      database: "my_database",
      user: "root",
      password: "password",
    },
    migrations: {
      directory: "../migrations",
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "my_database",
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "../migrations",
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "my_database",
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "../migrations",
      tableName: "knex_migrations",
    },
  },
};
