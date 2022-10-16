const knex = require("../db/connection")

function list(date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function listReservation(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: (reservation_id.reservation_id) ? reservation_id.reservation_id : reservation_id })
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createReservation) => createReservation[0])
}

function update(reservation_id, status) {

    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .update("status", status)
        .returning("*")
}

module.exports = {
    create,
    list,
    listReservation,
    update,
    search,
}