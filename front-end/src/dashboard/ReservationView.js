import React from "react";
import { useEffect } from "react";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://git.heroku.com/reservation-system-thinkful.git"
    : "http://localhost:3001/reservations?date=xxxx-xx-xx";

function ReservationView({ reservation }) {
    async function getReservation(reservation, signal) {
      const response = fetch(BASE_URL, {
        method: "GET",
      });

      return response;
    }

    useEffect(() => {
        const abortController = new AbortController();

        async function loadReservation() {
            await getReservation(reservation, abortController.signal)
        }

        loadReservation()
    }, [reservation])

    return (
        <>
        <div className="container">
            <div className="border border-secondary mt-2">
                <div className="row">
                    <div className="pl-2">
                        <h4 className="ml-3">{reservation.first_name} {reservation.last_name}</h4>
                        <p className="ml-4">{reservation.reservation_date} at {reservation.reservation_time} for {reservation.people} guest(s)</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ReservationView