import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [resDate, setResDate] = useState("")

  useEffect(loadDashboard, [resDate]);

  const nextDate = async (event) => {
    event.preventDefault()
    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(`${year}-${month}-${day}`)
    setResDate(next(`${year}-${month}-${day}`));
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-flex justify-content-between pt-2">
        <button type="button" onClick={() => previous(date)} className="btn btn-secondary">
          Previous Day
        </button>
        <button type="button" onClick={today} className="btn btn-primary">
          Today
        </button>
        <button type="button" onClick={() => nextDate} className="btn btn-secondary">
          Next Day
        </button>
      </div>
      <div className="d-md-flex mb-3 pt-3">
        <h4 className="mb-0">Reservations for {resDate}</h4>
      </div>

      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
