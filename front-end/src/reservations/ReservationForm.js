import React from "react";
import { useHistory } from "react-router";

function ReservationForm({ handleSubmit, handleChange, reservation }) {
    const history = useHistory()


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
                required
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
                required
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
                required
              />
            </div>
            <div className="pt-1">
              <input
                id="reservation_date"
                type="date"
                name="reservation_date"
                onChange={handleChange}
                value={reservation.reservationDate}
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
                value={reservation.reservationTime}
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
                defaultValue={reservation.people}
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
}

export default ReservationForm