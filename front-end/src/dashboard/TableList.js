import React from "react";
import TableView from "./TableView";

function TableList({ tables }) {
    return (
      <>
        <div>
          {tables.map((table, index) => (
            <TableView table={table} key={index} />
          ))}
        </div>
      </>
    );
}

export default TableList

