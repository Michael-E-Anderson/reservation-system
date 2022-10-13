// import React, { useEffect, useState } from "react";
// import {
//   cancelReservation,
//   finishTable,
//   listReservations,
//   listTables,
// } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";
// import { next, previous, today } from "../utils/date-time";
// import TablesList from "./TablesList";
// import ReservationsList from "./ReservationsList";
// import DateButtons from "./DateButtons";

// /**
//  * Defines the dashboard page.
//  * @param date
//  *  the date for which the user wants to view reservations.
//  * @returns {JSX.Element}
//  */
// function Dashboard({ date }) {
//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);
//   const [tables, setTables] = useState([]);
//   const [tablesError, setTablesError] = useState(null);

//   useEffect(loadDashboard, [date]);

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);

//     listTables(abortController.signal).then(setTables).catch(setTablesError);

//     return () => abortController.abort();
//   }

//   function onCancel(reservation_id) {
//     const abortController = new AbortController();
//     cancelReservation(reservation_id, abortController.signal)
//       .then(loadDashboard)
//       .catch(setReservationsError);

//     return () => abortController.abort();
//   }

//   function onFinish(table_id, reservation_id) {
//     finishTable(table_id, reservation_id)
//       .then(loadDashboard)
//       .catch(setTablesError);
//   }

//   return (
//     <main>
//       <h1>Dashboard</h1>
//       <div className="row">
//         <div className="col-md-6 col-lg-6 col-sm-12">
//           <div className="d-md-flex mb-3">
//             <h4 className="box-title mb-0">Reservations for {date}</h4>
//           </div>
//           <ErrorAlert error={reservationsError} />
//           <DateButtons
//             previous={`/dashboard?date=${previous(date)}`}
//             today={`/dashboard?date=${today()}`}
//             next={`/dashboard?date=${next(date)}`}
//           />
//           <ReservationsList onCancel={onCancel} reservations={reservations} />
//         </div>
//         <div className="col-md-6 col-lg-6 col-sm-12">
//           <ErrorAlert error={tablesError} />
//           <TablesList onFinish={onFinish} tables={tables} />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Dashboard;











// Message Teddy Mitchell










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
}

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null)
  const params = useQuery()
  const filteredDate = params.get("date") || date
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
  }

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
}

export default Dashboard;
