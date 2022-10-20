// This component defines how a specific reservation will appear on the Dashboard.
// This component is used in ./ReservationList.js

import React from "react";
import { Link } from "react-router-dom";
import { updateReservation, cancelReservation } from "../utils/api";

function ReservationView({ reservation }) {
    const abortController = new AbortController();

    // Changes a reservation's status to "seated".
    function handleUpdate() {
      updateReservation(reservation, abortController.signal)
    };
    
    // After confirmation, this function changes a reservation's status to "cancelled" and refreshes the page.
    function handleCancel(event) {
      event.preventDefault()
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        cancelReservation(reservation.reservation_id, abortController.signal)
          .then(window.location.reload())
      };  
    };

    return (
      reservation.status !== "finished" && reservation.status !== "cancelled" && (
        <>
          <div className="container">
            <div className="border border-secondary mt-2">
              <div className="d-flex">
                <div className="col-7">
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
                      <p
                        className="ml-4"
                        data-reservation-id-status={reservation.reservation_id}
                      >
                        Status: <strong>{reservation.status}</strong>{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="col-3">
                    {reservation.status === "seated" ? (
                      <div></div>
                    ) : (
                      <div className="p-2 pt-4">
                        <Link
                          to={`/reservations/${reservation.reservation_id}/seat`}
                          className="btn btn-primary pl-4 pr-4"
                          onClick={handleUpdate}
                        >
                          Seat
                        </Link>
                      </div>
                    )}
                    <div className="ml-auto p-2 pt-4">
                      <Link
                        to={`/reservations/${reservation.reservation_id}/edit`}
                        className="btn btn-secondary pl-4 pr-4"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="ml-auto p-2 pt-4">
                      <button
                        type="button"
                        data-reservation-id-cancel={reservation.reservation_id}
                        className="btn btn-danger pl-3 pr-3"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    );
};

export default ReservationView;