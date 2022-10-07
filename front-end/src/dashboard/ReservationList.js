import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations }) {

    // const sortedReservations = [...reservations].sort(
    //   (a, b) => a.reservation_time.localeCompare(b.reservation_time)
    // );
    
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
    )
}

export default ReservationList