const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * List handler for reservation resources
 */

async function list(req, res) {

  if(req.query.date) {
    const data = await service.list(req.query.date);
    const sortedReservations = [...data].sort((a, b) =>
      a.reservation_time.localeCompare(b.reservation_time)
    );
    res.json({
      data: sortedReservations.filter(
        (reservation) => reservation.status !== "finished"
      ),
    });
  }

  if (req.query.mobile_number) {
    const data = await service.search(req.query.mobile_number)
    if(data){
      res.json({ data: data });
    } else {
      res.status(404).message("Reservation not found.")
    }
    
  }
  
}

async function listReservation(req, res) {
  const data = await service.listReservation(req.params.reservation_id || req.body.data?.reservation_id)
  res.status(200).json({ data: data[0] })
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

function notATuesday(req, res, next) {
  const resDate = req.query.reservation_date || req.body.data?.reservation_date;
  const year = parseInt(resDate.substring(0, 4));
  const month = parseInt(resDate.substring(5, 7)) - 1;
  const day = parseInt(resDate.substring(8, 10)) + 1;
  const date = new Date(Date.UTC(year, month, day)).toString();
  const resDay = date.substring(0, 3);

  if (resDay === "Tue") {
    next({
      status: 400,
      message: "The restaurant is closed on Tuesdays."
    })
  }
    return next()
}

function inTheFuture(req, res, next) {
  const resDate = req.query.reservation_date || req.body.data?.reservation_date;
  const resTime = req.query.reservation_time || req.body.data?.reservation_time;
  const resHour = parseInt(resTime.substring(0, 3));
  const resMinutes = parseInt(resTime.substring(3, 6));
  const year = parseInt(resDate.substring(0, 4));
  const month = parseInt(resDate.substring(5, 7));
  const day = parseInt(resDate.substring(8, 10));
  const now = new Date();
  const nowHour = now.getHours();
  const nowMinutes = now.getMinutes();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear()
  
  if (year < nowYear || year === nowYear && month < nowMonth || year === nowYear && month === nowMonth && day < nowDay || nowDay === day && nowMonth === month && nowHour >= resHour && nowMinutes >= resMinutes) {
    next({
      status: 400,
      message: "reservation_time and reservation_date must be made for a future date and time."
    })
  } 
  return next() 
}

function openHours(req, res, next) {
  const resTime = req.query.reservation_time || req.body.data?.reservation_time;

  if (resTime < "10:30" || resTime > "21:30" ) {
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
  const people = req.query.people || req.body.data?.people;
  if(typeof people !== "number" && (req.body.data?.people)) {
    next({
      status: 400,
      message: `people must be a number.`,
    });
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

function statusIsNotBooked(req, res, next) {
  const status = req.query.status || req.body.data?.status
  if (status !== "booked" && status !== undefined) {
    next({
      status: 400,
      message: `The status cannot start as "${status}"`
    })
  } else {
    return next()
  }
}

async function create(req, res) {
  const data = await service.create(req.query.people? req.query : req.body.data)
  res.status(201).json({ data })
}

async function update(req, res) {
  const status = req.body.data.status
  
  if (status === "booked") {
    let updatedReservation = await service.updateReservation(req.body.data)
    res.status(200).json({ data: updatedReservation[0] })
  } 
}

async function reservationExists(req, res, next) {
  const reservation = await service.listReservation(req.params.reservation_id)
  console.log(reservation, "mmmmmmmmm")

  if (reservation.length) {
    next()
  } else {
    next({
      status: 404,
      message: `Reservation ${req.params.reservation_id} does not exist`
    })
  }
}

function reservationHasStatus(req, res, next) {
  // const reservation = service.listReservation(req.params.reservation_id)
  const status = req.body.data.status
  if (status === "unknown") {
    next({
      status: 400,
      message: `Reservation ${req.body.data.reservation_id}'s status is unknown.`,
    });
  } else {
    return next()
  }
}

async function statusIsFinished (req, res, next) {
  const reservation = await service.listReservation(req.body.data.reservation_id)

  if (reservation[0].status === "finished") {
    next ({
      status: 400,
      message: `Reservation ${req.body.data.reservation_id} is finished and cannot be changed.`
    })
  } else {
    next()
  }
}

async function cancelReservation (req, res) {
  const reservation = await service.listReservation(req.params.reservation_id)
  const cancelled = await service.updateStatus(reservation[0].reservation_id, "cancelled");

  res.status(200).json({ data: cancelled[0] })
}



module.exports = {
  list: asyncErrorBoundary(list),
  listReservation: asyncErrorBoundary(listReservation),
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
    notATuesday,
    inTheFuture,
    openHours,
    statusIsNotBooked,
    asyncErrorBoundary(create),
  ],
  update: [
    bodyHasData("first_name"),
    bodyHasData("last_name"),
    bodyHasData("mobile_number"),
    bodyHasData("reservation_date"),
    bodyHasData("reservation_time"),
    bodyHasData("people"),
    // bodyHasData("status"),
    peopleQuantity,
    peopleIsANumber,
    dateIsDate,
    notATuesday,
    inTheFuture,
    openHours,
    asyncErrorBoundary(reservationExists),
    reservationHasStatus,
    asyncErrorBoundary(statusIsFinished),
    asyncErrorBoundary(update),
  ],
  cancel: [asyncErrorBoundary(cancelReservation)]
};
