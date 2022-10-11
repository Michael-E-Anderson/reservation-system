import React from "react";
import { useHistory } from "react-router";

function TablesForm({ handleChange, handleSubmit, tables }) {
    const history = useHistory()

    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tables">Tables</label>
            <div>
              <input
                id="table_name"
                type="text"
                name="table_name"
                onChange={handleChange}
                value={tables.firstName}
                placeholder="Table Name"
                required
              />
            </div>
            <div className="pt-2">
              <input
                id="capacity"
                type="number"
                name="capacity"
                onChange={handleChange}
                value={tables.capacity}
                placeholder="Capacity"
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

export default TablesForm