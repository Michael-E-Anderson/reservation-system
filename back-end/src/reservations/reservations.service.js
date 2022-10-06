const knex = require("../db/connection")


//TODO: play with list to learn more about how it's working
function list(date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createReservation) => createReservation[0])
}

module.exports = {
    create,
    list
}