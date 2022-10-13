const knex = require("../db/connection")

function list() {
  return knex("tables")
    .select("*")
}

function listTable(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createTable) => createTable[0]);
}

function update(updatedTable, tableId) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableId})
    .update(updatedTable, "*")
    .returning("*")

}

module.exports = {
    create,
    list,
    update,
    listTable,
}