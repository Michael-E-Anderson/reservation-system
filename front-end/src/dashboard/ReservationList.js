import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations }) {

    const sortedReservations = [...reservations].sort((a, b) => a.reservation_time - b.reservation_time)
    console.log("sorted", sortedReservations)
    return (
        <>
            <div>
                {sortedReservations.map((reservation, index) =>
                    <ReservationView
                        reservation={reservation}
                        key={index}
                    />
                )}
            </div>
        </>
    )
}

export default ReservationList