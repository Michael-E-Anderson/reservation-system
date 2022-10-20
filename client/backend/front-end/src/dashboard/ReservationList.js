// This component maps through reservations to display them on the Dashboard.
// This component is used in ./Dashboard.js and ../search/SearchView.js

import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations }) {
    return (
        <>
            <div>
                {reservations.map((reservation, index) =>
                    <ReservationView
                        reservation={reservation}
                        key={index}
                    />
                )}
            </div>
        </>
    );
};

export default ReservationList;