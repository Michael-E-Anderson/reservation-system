const knex = require("../db/connection")

function list() {
  return knex("tables")
    .select("*")
}



function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createTable) => createTable[0]);
}
// add where clause to update to update specific table.
function update(updatedTable) {
  return knex("tables")
    .update(updatedTable)
    .returning("*")
}

module.exports = {
    create,
    list,
    update,
}