# Michael Anderson's Restaurant Reservation System

#### The link provided here will bring you to a version on the application online: 


## How the Application Works
##### Below is a description paired with images to show you how the application works and how it can benefit you.



  ### DASHBOARD
  ##### The Dashboard is your main page.  It constantly displays list of all reservations of a given day and a list of all of the tables in your restaurant.  
<br>
<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.28.46 AM.png"></img>
<br>

  ##### The Dashboard defaults to the date you are accessing it, but by using the buttons at the top, you can navigate to different dates and back to the current date.  Above, you can see that the date the Dashboard was accessed was October 10th, 2022.
#
  ### Create A Reservation

  ##### By clicking on the "New Reservation" link in the menu, you will be brought to a form when you can add a new reservation.  There form will check that the information being put in is valid.  It will check that the reservation is being made for a time when the restaurant is open, a time that is in the future, and that there is at least one person on the reservation.  As shown below, if information that is input goes against the validity check, a simple error message will appear when you hit submit button to notify you why the reservation was not submitted.
<br>
  <img src="./Markdown Images/Screen Shot 2022-10-19 at 9.30.08 AM.png"></img>
  
 

  ##### Otherwise, the submit button will add the reservation to your database and will navigate to the the Dashboard displaying the date that the reservation was made for, as shown below.
<br>
  <img src="./Markdown Images/Screen Shot 2022-10-19 at 9.30.35 AM.png"></img>

#


### Create A Table

##### By clicking on the "New Table" link in the navigation menu, you will be redricted to a form that will allow you to add a new table to your database of tables.  This form also checks that the information input into the fields is valid, and will display an error message if the information is not valid, as shown below.
<br>
<img src="./Markdown Images/Screen Shot 2022-10-19 at 1.12.47 PM.png"></img>

##### Otherwise, the submit button will create the table and add it to your list of tables.

#
### Search for a Reservation
##### If you click on the "Search" link in the navigation menu, it will bring you to a form where you can search for all reservations by the guest's mobile number.  If the mobile number does not exist in the database, an error message will appear to let you know, as show below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 10.42.56 AM.png"></img>

##### However, if the mobile number does exist, it will display all reservations made with that mobile number, as shown below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.39.02 AM.png"></img>

#

### Edit A Reservation
##### Once a reservation has been added, it can be changed so long as the reservation has not been cancelled or the reservation has not be completed.  You can edit a reservation by finding the reservation on the Dashboard or through the Search.  You simply click on the edit button on the reservation, and it will bring you to a form.  This form works exactly the same as the "New Reservation" form, but instead of creating a new reservation, it updates an existing reservation.  You will see that the reservation information is already uploaded on the form, and you can edit it however you would like.  All of the same validty checks will happen when you click submit.  Below is an image of the Edit Reservation page.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.33.20 AM.png"></img>

##### Below, all of the reservation fields have been changed.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.34.15 AM.png"></img>

##### And after the edit is submitted, you can find the updated reservation, as shown below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.34.26 AM.png"></img>

#

### Seating a Reservation

##### When you're ready to seat a party, simply click on the "Seat" button on the party's reservation.  This button will bring you to the Seat Reservation page, as shown below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.31.20 AM.png"></img>

##### When you click the Submit button, the page will change back to the Dashboard, and you will see that the status of the reservation has been changed to "seated" and the status of the selected table has been changed to "Occupied", as shown below. 
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.32.11 AM.png"></img>

#
### Finishing a Reservation

##### When a reservation has left and the table is ready for another party, you can click the "Finish" button on the table listing.  Doing so will load a confirmation page as show below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.32.44 AM.png"></img>

##### Once you click "OK", the status of the reservation will change to finished, and the reservation will disappear from the Dashboard.  Also, the status of the table will change back to "Free", as shown below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.32.55 AM.png"></img>

#
### Cancelling a Reservation

##### Should you need to cancel a reservation, simply click the "Cancel" button on the reservation's listing, and that will bring up a confirmation window as shown below.
<br>

<img src="./Markdown Images/Screen Shot 2022-10-19 at 9.35.03 AM.png"></img>
<br>

##### Clicking the "OK" button changes the reservation's status to "cancelled" and the reservation is hidden from the dashboard.


#

## Intallation Instructions
  ##### 1. Fork and clone this repository.
##### 2. Run cp ./back-end/.env.sample ./back-end/.env.
##### 3. Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
##### 4. Run cp ./front-end/.env.sample ./front-end/.env.
##### 5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5001.
##### 6. Run npm install to install project dependencies.
##### 7. Run npm run start:dev to start your server in development mode.
##### 8. If you have trouble getting the server to run, reach out for assistance.


#

### Technology Used
##### This application uses React, Javascript, Bootstrap, Node.js, Express, Knex, PostgreSQL, Jest, and Puppeteer.

#

### APIs

##### Below are a list of the API's used in this application and descriptions of how they work.
<br>

#### fetchJson
##### This function uses a url and options to return a resolved promise.  It will monitor for rejected promises and handle the rejection as well.
<br>

#### listReservations
##### This function takes in a parameter and a signal. It then creates a url using the base url and the parameters, and passes the url to the fetchJson function along with headers and the signal.

<br>

#### createReservation 
##### This function accepts a reservation and a signal.  It then creates options with a POST method and the reservation data, and passes that along to fetchJson along with a url.
<br>

#### readReservation
##### This function accepts a reservation_id and a signal.  It creates a url using the base url and the reservation_id, and passes that along to the fetchJson function.
<br>

#### cancleReservation
##### This function accepts as reservation_id and a signal.  It creates a url using the base url and a the reservation_id, and then creates an option with a POST method and a body consisting of status: "cancelled".  It then passes the url and the options along to fetchJson.
<br>

#### updateReservation
##### This function accepts a reservation and signal.  It then creates a url using the base url and the reservation_id, updates the data, and creates options with a PUT method and the updated data in the body.  It then passes the url and the options to fetchJson.
<br>

#### createTable
##### This function accepts a table and a signal.  It then creates a url using the base url, creates options with a POST method and the table in the body, and then passes the url and options to fetchJson.
<br>

#### listTables
##### This function accepts a signal, creates a url with the base url, and then passes the url to fetchJson.
<br>

#### seatReservation
##### This function accepts a reservation_id and a table_id.  If there's no reservation id, an error is thrown.  It then creates a url using the base url and the table_id, creates options with a PUT method and the reservation_id in the body, and passes along the url and the options to fetchJson.
<br>

#### finishTable
##### This function accepts a table_id and a reservation_id.  It then creates a url using the base url and the table_id, creates options with a DELETE method, and passes the url and the options to fetchJson.