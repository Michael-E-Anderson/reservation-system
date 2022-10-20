// Contains all of the queries to manipulate the "tables" table in the database.

const knex = require("../db/connection");

// Lists all tables.
function list() {
  return knex("tables")
    .select("*")
};

// Lists a specific table given the table_id.
function listTable(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
};

// Adds a new table to the "tables" table.
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createTable) => createTable[0]);
};

// Updates an existing table.
function update(updatedTable, tableId) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableId})
    .update(updatedTable, "*")
    .returning("*")

};

// Changes the reservation_id column of a specific table to null.
function destroy(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .update("reservation_id", null)
    .returning("*");
};

module.exports = {
    create,
    list,
    update,
    listTable,
    destroy,
};