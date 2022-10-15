import React from "react";
import { Link } from "react-router-dom";
import { updateReservation } from "../utils/api";

function ReservationView({ reservation }) {
    const abortController = new AbortController

    function handleUpdate() {
      updateReservation(reservation, abortController.signal)
    }

    return ( reservation.status !== "finished" &&
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
                  <p className="ml-4" data-reservation-id-status={reservation.reservation_id}>Status: <strong>{reservation.status}</strong> </p> 
                </div>
              </div>
              {reservation.status === "seated" ? <div></div> : <div className="ml-auto p-2 pt-4">
                <Link
                  to={`/reservations/${reservation.reservation_id}/seat`}
                  className="btn btn-primary pl-4 pr-4"
                  onClick={handleUpdate}
                >
                  Seat
                </Link>
              </div>}
            </div>
          </div>
        </div>
      </>
    );
}

export default ReservationView