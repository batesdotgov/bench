var conn = {
  host: "0.0.0.0",
  user: "root",
  password: "password",
  charset: "utf8",
};

var knex = require("knex")({ client: "mysql", connection: conn });

knex
  .raw("drop database my_database")
  .then(function () {
    knex
      .raw("CREATE DATABASE IF NOT EXISTS my_database")
      .then(function () {
        console.log("database created");
        knex.destroy();
      })
      .catch(function (err) {
        console.error("error creating database:", err);
        process.exit(1);
      });
  })
  .catch(function (err) {
    console.error("error dropping database:", err);
  });
