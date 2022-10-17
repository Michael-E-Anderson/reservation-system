import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import DateButtons from "./DateButtons";
import TableList from "./TableList";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const params = useQuery();
  const filteredDate = params.get("date") || date;
  useEffect(loadDashboard, [filteredDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: filteredDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <DateButtons
        previous={`/dashboard?date=${previous(filteredDate)}`}
        today={`/dashboard?date=${today()}`}
        next={`/dashboard?date=${next(filteredDate)}`}
      />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-md-flex mb-3 pt-3">
              <h4 className="mb-0">Reservations for {filteredDate}</h4>
            </div>
            <ErrorAlert error={reservationsError} />
            <ReservationList reservations={reservations} />
          </div>
          <div className="col">
            <div className="d-md-flex mb-3 pt-3">
              <h4 className="mb-0">Tables</h4>
            </div>
            <ErrorAlert error={tablesError} />
            <TableList tables={tables} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;