const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query.date)
  const sortedReservations = [...data].sort((a, b) =>
    a.reservation_time.localeCompare(b.reservation_time)
  );
  res.json({ data: sortedReservations });
}

function bodyHasData(propertyName) {
  return function(req, res, next) {
    const data = {...req.body.data, ...req.query};

    if (data[propertyName]) {
      return next()
    } next({
      status: 400,
      message: `Reservation must include ${propertyName}.`
    })
  }
}

function open(req, res, next) {
  const resDate = req.query.reservation_date || req.body.data?.reservation_date;
             const resTime = req.query.reservation_time || req.body.data?.reservation_time;
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
                 return next({
                   status: 400,
                   message: "The restaurant is closed on Tuesdays."
                 })
             } else if (nowDay === day && nowMonth === month && nowHour >= resHour && nowMinutes >= resMinutes) {
                 return next({
                   status: 400,
                   message: "reservation_time and reservation_date must be made for a future date and time."
                 })
             } else if (resTime < "10:30" || resTime > "21:30" ) {
                 return next({
                   status: 400,
                   message: "reservation_time must be made between 10:30AM and 9:30PM."
                 })
             } else {
                 return next()
             }
        } 

function peopleQuantity(req, res, next) {
  const people = req.query.people || req.body.data?.people
  if (people > 0) {
    return next()
  } next({
    status: 400,
    message: `The reservation must have a party of at least 1 people.`
  })
}

function peopleIsANumber(req, res, next){
  const people = req.query.people || req.body.data?.people
  console.log("Query", req.query.people, "body", req.body.data.people)
  if(typeof people !== "number") {
    next({
      status: 400,
      message: "The people info must be a number."
    })
  } else {
    return next()
  }
}

function dateIsDate(req, res, next) {
  const date = req.query.reservation_date || req.body.data?.reservation_date
  if(Date.parse(date) > 0) {
    return next();
  } else {
    next({
      status: 400,
      message: "The reservation_date must be a date."
    })    
  }
}

async function create(req, res) {
  const data = await service.create(req.query.people? req.query : req.body.data)
  res.status(201).json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasData("first_name"),
    bodyHasData("last_name"),
    bodyHasData("mobile_number"),
    bodyHasData("reservation_date"),
    bodyHasData("reservation_time"),
    bodyHasData("people"),
    peopleQuantity,
    peopleIsANumber,
    dateIsDate,
    open,
    asyncErrorBoundary(create),
  ],
};
