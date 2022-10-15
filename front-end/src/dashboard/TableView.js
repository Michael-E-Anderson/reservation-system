import React from "react";
import { finishTable, updateReservation, readReservation } from "../utils/api";

function TableView({ table }) {

  async function handleFinish(event) {
    event.preventDefault();
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController
      const reservation = await readReservation(table.reservation_id, abortController.signal)
      console.log(reservation)
      await updateReservation(reservation, abortController.signal)
        .then(finishTable(table.table_id, table.reservation_id))
        .then(window.location.reload);
    }
  }
  

    function isOccupied(table) {
        return table.reservation_id
    }
    return (
      <>
        <div className="border border-secondary mt-2">
          <div>
            <div>
              <div className="d-flex">
                <div className="mr-auto p-2">
                  <div className="pl-2">
                    <h4 className="ml-3">{table.table_name}</h4>
                    <p className="ml-4" data-table-id-status={table.table_id}>
                      Status: {isOccupied(table) ? "Occupied" : "Free"}
                    </p>
                  </div>
                </div>
                <div className="p-2 pt-4">
                  <button
                    type="button"
                    className="btn btn-danger pl-4 pr-4"
                    onClick={handleFinish}
                    data-table-id-finish={table.table_id}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default TableView