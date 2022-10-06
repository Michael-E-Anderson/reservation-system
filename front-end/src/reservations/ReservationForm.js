import React from "react";
import { useHistory } from "react-router-dom"

function ReservationForm({ handleSubmit, changeHandler, reservation }) {
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
                onChange={changeHandler}
                value={reservation.firstName}
                placeholder="First Name"
              />
            </div>
            <div>
              <input
                id="last_name"
                type="text"
                name="last_name"
                onChange={changeHandler}
                value={reservation.lastName}
                placeholder="Last Name"
              />
            </div>
            <div>
                <input
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    onChange={changeHandler}
                    value={reservation.mobileNumber}
                    placeholder="Mobile Number"
                />
            </div>
            <div>
                <input
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    onChange={changeHandler}
                    value={reservation.reservationDate}
                    placeholder="Date of Reservation"
                />
            </div>
            <div>
                <input
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    onChange={changeHandler}
                    value={reservation.reservationTime}
                    placeholder="Time of Reservation"
                />
            </div>
            <div>
                <input
                    id="people"
                    type="number"
                    min={1}
                    name="people"
                    onChange={changeHandler}
                    value={reservation.people}
                    placeholder="Number of Guests"
                />
            </div>
          </div>
          <div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={() => history.push(`/reservations?date=${reservation.date}`)}
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