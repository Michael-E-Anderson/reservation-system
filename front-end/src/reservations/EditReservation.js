// This component is the parent component of and contains functions for ./ReservationForm.js, and allows an existing reservation to be updated.\
// This component is used in ../layout/Routes.js.

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const mountedRef = useRef(false);
  const reservation_id = useParams();
  const history = useHistory();
  const [reservation, setReservation] = useState([]);
  const [editReservation, setEditReservation] = useState([]);
  

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
      const abortController = new AbortController();
      async function loadReservation() {
        await readReservation(
          reservation_id.reservation_id,
          abortController.signal
        ).then(setReservation);
        await readReservation(
          reservation_id.reservation_id,
          abortController.signal
        ).then(setEditReservation);
      }

      loadReservation()
      return () => abortController.abort();

  }, [reservation_id.reservation_id]);

  // Sets the states for reservation and editReservation.
  

  // Allows the form to be changed and changes anything in the "people" input to a number.
  const handleChange = ({ target }) => {
    setEditReservation((currentState) => ({
      ...currentState,
      [target.name]:
        target.name === "people" ? parseInt(target.value) : target.value,
    }));
  };

  // Updates a reservation and changes the page to display reservations of the updated reservation's date on the Dashboard.
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController()
    updateReservation(editReservation, abortController.signal).then(() => {
      history.push(`/dashboard?date=${editReservation.reservation_date}`);
    });
  };

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="mr-1 mb-1 bi bi-house-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                  <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/reservations/${reservation.reservation_id}`}>
                Reservation for {reservation.first_name} {reservation.last_name}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Reservation {reservation.reservation_id}
            </li>
          </ol>
        </nav>
        <h3>Edit Reservation</h3>
        <ReservationForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          reservation={editReservation}
        />
      </div>
    </>
  );
}

export default EditReservation;
