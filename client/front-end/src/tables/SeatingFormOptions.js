// This component defines how the tables will appear in the seating form.
// This component is used in ./SeatingForm.js.

import React from "react";

function SeatingFormOptions({ table }) {
    return (
        <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
    );
};

export default SeatingFormOptions;