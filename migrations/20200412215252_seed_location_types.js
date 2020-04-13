exports.up = async function (knex) {
  return Promise.all([
    knex.raw(`insert into locations (name) values ("Richmond")`),
    knex.raw(`insert into locations (name) values ("Denver")`),
    knex.raw(`insert into locations (name) values ("Charlotte")`),
    knex.raw(`insert into locations (name) values ("Reston")`),
  ]);
};

exports.down = async function (knex) {
  return await knex.raw(`delete from locations`);
};
