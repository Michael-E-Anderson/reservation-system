// This component holds the code to create a new table.
// This componenet is used in ../layout/Routes.js.

import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"
import TablesForm from "./TablesForm";

function AddTable() {
    const mountedRef = useRef(false);
    const history = useHistory();

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);

    const initialFormState = {
      table_name: "",
      capacity: "",
    };

    const [formData, setFormData] = useState([]);
    const [error, setError] = useState("")
    
    // Allows information to be input into the tables form and changes the "capacity" input's value to a number.
    const changeHandler = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.name === "capacity" ? parseInt(target.value) : target.value,
      });
    };

    // Creates the table and changes the page to the Dashboard.
    const handleSubmit = async (event) => {
      event.preventDefault();
      await createTable(formData).then(() => {
        history.push(`/dashboard`)
        setFormData(initialFormState)
      })    
      .catch((err) => {
        setError(err)
      })
      

      
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
              Add Table
            </li>
          </ol>
        </nav>
        <div>
          <h3>Add Table</h3>
        </div>
        <div>
          <TablesForm
            handleChange={changeHandler}
            handleSubmit={handleSubmit}
            tables={formData}
          />
          <ErrorAlert error={error} />
        </div>
      </>
    );
};

export default AddTable;