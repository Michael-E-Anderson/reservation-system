import React from "react";

function SearchForm({ handleChange, handleSearch, mobile_number }) {
    return (
      <>
        <h3>Search for Reservation by Mobile Number</h3>
        <form onSubmit={handleSearch}>
          <label htmlFor="search">Enter a Mobile Number:</label>
          <div>
            <input
              id="mobile_number"
              type="text"
              name="mobile_number"
              onChange={handleChange}
              value={mobile_number.mobile_number || ""}
              placeholder="Mobile Number"
              required
            />
            <button
              type="submit"
              className="btn btn-primary ml-2 pl-3 pr-3 pb-1 pt-1"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </>
    );
};

export default SearchForm;