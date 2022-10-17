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