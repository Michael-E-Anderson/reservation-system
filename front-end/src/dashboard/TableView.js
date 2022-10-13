import React from "react";

function TableView({ table }) {
    function isOccupied(table) {
        return table.reservation_id
    }
    return (
      <>
        <div className="border border-secondary mt-2">
          <div className="d-flex">
            <div className="row p-2">
              <div className="pl-2">
                <h4 className="ml-3">{table.table_name}</h4>
                <p className="ml-4" data-table-id-status={table.table_id}>
                  Status: {isOccupied(table) ? "Occupied" : "Free"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default TableView