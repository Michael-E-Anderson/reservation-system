const knex = require("../db/connection")

function create(table) {
  return knex("table")
    .insert(table)
    .returning("*")
    .then((createTable) => createTable[0]);
}

module.exports = [
    create,
]