exports.up = function (knex) {
  return knex
    .raw("CREATE DATABASE IF NOT EXISTS my_database")
    .then(function () {
      console.log("database created");
      knex.destroy();
    })
    .catch(function (err) {
      console.error("error creating database:", err);
      process.exit(1);
    });
};

exports.down = function (knex) {
  return knex.raw("DROP DATABASE IF EXISTS my_database");
};
