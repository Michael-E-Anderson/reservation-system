// This component contains the code for the form to create and update a reservation.
// This componenet is used in ./AddReservation.js and ./EditReservation.js.

import React from "react";
import { useHistory } from "react-router";

function ReservationForm({ handleSubmit, handleChange, reservation }) {
    const history = useHistory();


    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reservation"> Reservation </label>
            <div>
              <input
                id="first_name"
                type="text"
                name="first_name"
                onChange={handleChange}
                value={reservation.first_name || ""}
                placeholder="First Name"
                required
              />
            </div>
            <div className="pt-1">
              <input
                id="last_name"
                type="text"
                name="last_name"
                onChange={handleChange}
                value={reservation.last_name || ""}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="pt-1">
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                onChange={handleChange}
                value={reservation.mobile_number || ""}
                placeholder="Mobile Number"
                required
              />
            </div>
            <div className="pt-1">
              <input
                id="reservation_date"
                type="date"
                name="reservation_date"
                onChange={handleChange}
                value={reservation.reservation_date || ""}
                placeholder="Date of Reservation"
                required
              />
            </div>
            <div className="pt-1">
              <input
                id="reservation_time"
                type="time"
                name="reservation_time"
                onChange={handleChange}
                value={reservation.reservation_time || ""}
                placeholder="Time of Reservation"
                required
              />
            </div>
            <div className="pt-1">
              <input
                id="people"
                type="number"
                min={1}
                name="people"
                onChange={handleChange}
                defaultValue={reservation.people || ""}
                placeholder="Number of Guests"
                required
              />
            </div>
          </div>
          <div className="pt-1">
            <button
              type="submit"
              className="btn btn-primary mr-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );
};

export default ReservationForm;