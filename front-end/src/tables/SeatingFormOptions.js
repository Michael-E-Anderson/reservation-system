import React from "react";

function SeatingFormOptions({ table }) {
    return (
        <option value={table.table_id}>Table: {table.table_name} - Capacity: {table.capacity}</option>
    )
}

export default SeatingFormOptions