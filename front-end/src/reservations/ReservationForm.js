import React from "react";
import { useHistory } from "react-router-dom"
import { today } from "../utils/date-time";

function ReservationForm({ handleSubmit, handleChange, reservation }) {
    const history = useHistory();
    let min = today()

    function closed(date) {
        const day = date.toLocaleDateString('en-US', {weekday: 'long'})
        const error = "The restaurant will be closed this day."
        if (day === "Tuesday") {
            throw error
        }
    }

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
                value={reservation.firstName}
                placeholder="First Name"
              />
            </div>
            <div className="pt-1">
              <input
                id="last_name"
                type="text"
                name="last_name"
                onChange={handleChange}
                value={reservation.lastName}
                placeholder="Last Name"
              />
            </div>
            <div className="pt-1">
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                onChange={handleChange}
                value={reservation.mobileNumber}
                placeholder="Mobile Number"
              />
            </div>
            <div className="pt-1">
              <input
                id="reservation_date"
                type="date"
                min={min}
                name="reservation_date"
                onChange={handleChange}
                value={reservation.reservationDate}
                placeholder="Date of Reservation"
              />
            </div>
            <div className="pt-1">
              <input
                id="reservation_time"
                type="time"
                name="reservation_time"
                onChange={handleChange}
                value={reservation.reservationTime}
                placeholder="Time of Reservation"
              />
            </div>
            <div className="pt-1">
              <input
                id="people"
                type="number"
                min={1}
                name="people"
                onChange={handleChange}
                value={reservation.people}
                placeholder="Number of Guests"
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
}

export default ReservationForm