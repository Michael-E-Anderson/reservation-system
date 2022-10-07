const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query.date)
  res.json({ data });
}

function bodyHasData(propertyName) {
  return function(req, res, next) {
    const data = {...req.body, ...req.query};

    if (data[propertyName]) {
      return next()
    } next({
      status: 400,
      message: `Reservation must include ${propertyName}.`
    })
  }
}

function peopleQuantity(req, res, next) {
  const people = req.query.people
  if (people > 0) {
    return next()
  } next({
    status: 400,
    message: `The reservation must have a party of at least 1 person.`
  })
}

async function create(req, res) {
  const data = await service.create(req.query)
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
    asyncErrorBoundary(create),
  ]
};
