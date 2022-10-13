import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://git.heroku.com/reservation-system-thinkful.git"
    : "http://localhost:3001";

function ReservationView({ reservation }) {
    const history = useHistory()


    // async function getReservation(reservation, signal) {
    //   const response = fetch(BASE_URL, {
    //     method: "GET",
    //   });

    //   return response;
    // }

    // useEffect(() => {
    //     const abortController = new AbortController();

    //     async function loadReservation() {
    //         await getReservation(reservation, abortController.signal)
    //     }
    //     loadReservation()
    // }, [reservation])

    return (
      <>
        <div className="container">
          <div className="border border-secondary mt-2">
            <div className="d-flex">
              <div className="row p-2">
                <div className="pl-2">
                  <h4 className="ml-3">
                    {reservation.first_name} {reservation.last_name}
                  </h4>
                  <p className="ml-4">
                    {reservation.reservation_date} at{" "}
                    {reservation.reservation_time} for {reservation.people}{" "}
                    guest(s)
                  </p>
                </div>
              </div>
              <div className="ml-auto p-2 pt-4">
                <button
                  type="button"
                  className="btn btn-primary pl-4 pr-4"
                  onClick={() =>
                    history.push(`/reservations/${reservation.reservation_id}/seat`)
                  }
                >
                  Seat
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ReservationView