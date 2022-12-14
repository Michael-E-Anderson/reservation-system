import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import AddReservation from "../reservations/AddReservation";
import AddTable from "../tables/AddTable";
import SeatingForm from "../tables/SeatingForm";
import SearchView from "../search/SearchView";
import EditReservation from "../reservations/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations" render={props => {
        return <Redirect to={`/dashboard${props.location.search || ""}`} />
      }}>        
      </Route>
      <Route exact={true} path="/reservations/new">
       <AddReservation />
      </Route>
      <Route exact={true} path="/tables/new">
        <AddTable />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatingForm />
      </Route>
      <Route exact={true} path={"/reservations/:reservation_id/edit"}>
        <EditReservation />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path={"/search"}>
        <SearchView />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
