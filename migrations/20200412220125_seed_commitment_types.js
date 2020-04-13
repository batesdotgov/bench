exports.up = async function (knex) {
  return Promise.all([
    await knex.raw(`insert into commitment_types (type) values ("Training")`),
    await knex.raw(
      `insert into commitment_types (type) values ("Client Prep")`
    ),
    await knex.raw(
      `insert into commitment_types (type) values ("Internal Project")`
    ),
  ]);
};

exports.down = async function (knex) {
  return await knex.raw(`delete from commitment_types`);
};
