const knex = require("../db/connection")

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createTable) => createTable[0]);
}

module.exports = [
    create,
]