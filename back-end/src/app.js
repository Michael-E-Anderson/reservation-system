const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router")

const app = express();

app.use(cors());

app.use(jsonParser);
app.use(urlencodedParser);

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);
console.log(Date.now(), "kkkkkkkkkkkk")
module.exports = app;
