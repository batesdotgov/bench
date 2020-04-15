/* eslint-disable */
var K = require("knex");

const conn = {
  host: "0.0.0.0",
  user: "root",
  password: "password",
  charset: "utf8",
};

const knex = K({ client: "mysql", connection: conn });

knex
  .raw("drop database if exists my_database")
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
