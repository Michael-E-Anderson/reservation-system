const reservations = require("./00-reservations.json")
// TODO: seed migrations and play with line 6
exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(reservations));
};
