// This component contains the code for the search page.
// This component is used in ../layouts/Routes.js.

import React from "react";
import { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../dashboard/ReservationList";
import SearchForm from "./SearchForm";

function SearchView() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState([]);
    const [number, setNumber] = useState([]);

    // Sets the state for reservations and if an error occurs, sets the state for error.
    function loadResults(){
        setError("")
        setReservations([])   
        const abortController = new AbortController();
        listReservations(
          { mobile_number: formData.mobile_number },
          abortController.signal
        )
          .then(setReservations)
          .then(setNumber(formData.mobile_number))
          .catch((err) => {
            setError(err.message);
          });

        return () => abortController.abort()
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        loadResults()
    };
  
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };

    return (
      <>
        <SearchForm
          handleSearch={handleSubmit}
          handleChange={handleChange}
          mobile_number={formData}
        />
        {reservations.length ? (
          <>
            <h3>Reservations for {number}</h3>
            <div>
              <ReservationList reservations={reservations} />
            </div>
          </>
        ) : (
          <div></div>
        )}
        {error && (
          <div className="alert p-2">
            <p className="alert-danger">No reservations found.</p>
          </div>
        )}
      </>
    );
};

export default SearchView;