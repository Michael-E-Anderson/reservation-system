// This component is the parent component of and contains functions for ./ReservationForm.js, and allows the creation of a new reservation.
// This component is used in ../layout/Routes.js

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";


      function AddReservation() {
        const history = useHistory();
        const [error, setError] = useState("");
        const [formData, setFormData] = useState([]);
        
        // Allows the form to have information input into the fields and changes the "people" input to be a number.
        const changeHandler = ({ target }) => {
          setFormData( {
            ...formData,
            [target.name]: target.name === "people" ? parseInt(target.value) : target.value,
          });
        };
        
        // Creates a new reservation and changes the page to display the Dashboard with reservations for the date of the new reservation.\
        // If the reservation cannot be created, the error message is displayed.
        const handleSubmit = async (event) => {
          event.preventDefault();
          createReservation(formData).then(() => {
            history.push(`/reservations?date=${formData.reservation_date}`);
          }).catch(err => {
            setError(err.message)
          });                  
        };

        return (
          <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>
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
                <li className="breadcrumb-item active" aria-current="page">
                  Add Reservation
                </li>
              </ol>
            </nav>
            <div>
              <h3>Add Reservation</h3>
            </div>
            <div>
              <ReservationForm
                handleChange={changeHandler}
                handleSubmit={handleSubmit}
                reservation={formData}
              />
              {error && <div className="alert pt-2">
                <p className="alert-danger">{error}</p>
              </div>}
            </div>
          </>
        );
      };

export default AddReservation;