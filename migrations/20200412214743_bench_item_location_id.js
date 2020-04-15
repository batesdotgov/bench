exports.up = async function (knex) {
  return await knex.schema.alterTable("bench_items", (table) => {
    table.integer("location_id").unsigned().references("id").inTable("locations");
  });
};

exports.down = async function (knex) {
  return await knex.schema.table("bench_items", (table) => {
    table.dropForeign("location_id");
    table.dropColumn("location_id");
  });
};
