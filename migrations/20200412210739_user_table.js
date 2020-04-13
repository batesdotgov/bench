exports.up = async function (knex) {
  return Promise.all([
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username", 100).notNullable();
      table.string("password").notNullable();
    }),

    await knex.schema.createTable("commitment_types", (table) => {
      table.increments("id").primary();
      table.string("type", 100).notNullable();
    }),

    await knex.schema.createTable("locations", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    }),

    await knex.schema.createTable("bench_items", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table
        .integer("commitment_type_id")
        .unsigned()
        .references("id")
        .inTable("commitment_types");
      table.string("title", 255).notNullable();
      table.text("description").notNullable();
      table.timestamp("created").notNullable().defaultTo(knex.fn.now());
      table.integer("points").notNullable().defaultTo(0);
    }),
  ]);
};

exports.down = async function (knex) {
  return Promise.all([
    await knex.schema.dropTableIfExists("bench_items"),
    await knex.schema.dropTableIfExists("commitment_types"),
    await knex.schema.dropTableIfExists("locations"),
    await knex.schema.dropTableIfExists("users"),
  ]);
};
