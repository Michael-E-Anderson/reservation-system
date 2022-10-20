// This component contains the code for the seating form and maps through all tables.
// This component is used in ../layout/Routes.js.

import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { seatReservation } from "../utils/api";
import { listTables } from "../utils/api";
import SeatingFormOptions from "./SeatingFormOptions";

function SeatingForm() {
    const [formData, setFormData] = useState([]);
    const [tables, setTables] = useState([]);
    const [error, setError] = useState("");
    const history = useHistory();
    const { reservation_id } = useParams();

    useEffect(loadTables, []);
    
    // Sets the state for tables.
    function loadTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
            .then(setTables)

        return () => abortController.abort()
    };


    const changeHandler = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };

    // Updates the status of a specific table and reservation and changes the page to the Dashboard.
    // If an error occurs, it sets the state of the error.
    const handleSubmit = async (event) => {
      event.preventDefault();
      seatReservation(reservation_id, formData.table_id).then(() => {
        history.push(`/dashboard`);
      }).catch(err => {
        setError(err.message)
      })   ;  
    };

    return (
      <>
        <div>
          <h3>Reservation Seating</h3>
          <form onSubmit={handleSubmit}>
            <div htmlFor="seating">Select a table:</div>
            <div>
              <select name="table_id" onChange={changeHandler}>
                <option value="">Select A Table</option>
                {tables.map((table, index) => (
                  <SeatingFormOptions table={table} key={index} />
                ))}
              </select>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-primary mr-2"
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
            {error && (
              <div className="alert pt-2">
                <p className="alert-danger">{error}</p>
              </div>
            )}
          </form>
        </div>
      </>
    );
};

export default SeatingForm;