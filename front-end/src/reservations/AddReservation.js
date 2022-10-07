import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import ReservationForm from "./ReservationForm";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://git.heroku.com/reservation-system-thinkful.git" : "http://localhost:3001/reservations";


      function AddReservation() {
        const mountedRef = useRef(false);
        const history = useHistory()
        const [error, setError] = useState("")
        // const { reservationId } = useParams();
        // const [reservation, setReservation] = useState([]);

        useEffect(() => {
          mountedRef.current = true;
          return () => {
            mountedRef.current = false;
          };
        }, []);

        // function readReservation(id, signal) {
        //   const response = fetch(BASE_URL);
        //   return response;
        // }

        // useEffect(() => {
        //   const abortController = new AbortController();
        //   async function loadReservation() {
        //     try {
        //       const response = await readReservation(
        //         reservationId,
        //         abortController.signal
        //       );
        //       if (mountedRef) {
        //         setReservation(response);
        //       }
        //     } catch (error) {
        //       throw error;
        //     }
        //   }
        //   if (reservationId) {
        //     loadReservation();
        //   }
        //   return () => abortController.abort();
        // }, [reservationId]);

        const initialFormState = {
          first_name: "",
          last_name: "",
          mobile_number: "",
          reservation_date: "",
          reservation_time: "",
          people: "",
        };

        const [formData, setFormData] = useState([]);
        const changeHandler = ({ target }) => {
            console.log("change")
          setFormData( {
            ...formData,
            [target.name]: target.value,
          });
        };

        async function createReservation(data) {
            mountedRef.current = true
          const response = await fetch(`${BASE_URL}?first_name=${data.first_name}&last_name=${data.last_name}&mobile_number=${data.mobile_number}&reservation_date=${data.reservation_date}&reservation_time=${data.reservation_time}&people=${data.people}`, {
            method: "POST",
            headers: {contentType: "application/json"},
            body: JSON.stringify(data),
          }).catch(error => {console.error(error)
        return Promise.reject(error)});


          return await response;
        }

        function closed(formData) {
             const resDate = formData.reservation_date;
             const resTime = formData.reservation_time;
             const resHour = parseInt(resTime.substring(0, 3))
             const resMinutes = parseInt(resTime.substring(3, 6))
             const year = parseInt(resDate.substring(0, 4))
             const month = parseInt(resDate.substring(5, 7))
             const day = parseInt(resDate.substring(8, 10))
             const date = new Date(Date.UTC(year, month, day)).toString()
             const resDay = date.substring(0, 3);
             const now = new Date()
             const nowHour = now.getHours()
             const nowMinutes = now.getMinutes()
             const nowDay = now.getDay() + 2
             const nowMonth = now.getMonth() + 1

             if (resDay === "Tue") {
                 return true
             } else if (nowDay === day && nowMonth === month && nowHour >= resHour && nowMinutes >= resMinutes) {
                 return true
             } else if (resTime < "10:30" || resTime > "21:30" ) {
                 return true
             } else {
                 return false
             }
        }

        const handleSubmit = async (event) => {
          event.preventDefault();
          const response = await createReservation(formData);        
          if (response.ok && !closed(formData)) {
          history.push(`/reservations?date=${formData.reservation_date}`);
          setFormData(initialFormState)
        } else if (closed(formData)) {
          setError(
            `You cannot make a reservation on ${formData.reservation_date} at ${formData.reservation_time}.  Please select another date and/or time.`
          );
        } else {
          setError("There must be at least 1 guest on the reservation.");
        };
        };

        return (
          <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="mr-1 mb-1 bi bi-house-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add Reservation
                </li>
              </ol>
            </nav>
            <div>
              <h3>Add Reservation</h3>
            </div>
            <div>
              <ReservationForm
                handleChange={changeHandler}
                handleSubmit={handleSubmit}
                reservation={formData}
              />
              <div className="alert pt-2">
                <p className="alert-danger">{error}</p>
              </div>
            </div>
          </>
        );
      };

export default AddReservation