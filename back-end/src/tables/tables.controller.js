const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  const sortedTables = [...data].sort((a, b) =>
    a.table_name.localeCompare(b.table_name)
  );
  res.json({ data: sortedTables });
}

function bodyHasData(propertyName) {
  return function (req, res, next) {
    const data = { ...req.body.data, ...req.query };

    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Reservation must include ${propertyName}.`,
    });
  };
}

function nameLength(req, res, next) {
    const name = req.query.table_name || req.body.data?.table_name
    if(name.length < 2) {
        next({
            status: 400,
            message: "table_name must contain at least 2 characters"
        })
    } next()
}

function hasCapacity(req, res, next) {
    const capacity = req.query.capacity || req.body.data?.capacity

    if(capacity > 0) {
        next()
    } else {
        next({
            status: 400,
            message: "capacity must be at least 1"
        })
    }
}

async function create(req, res) {
  const data = await service.create(
    req.query.capacity ? req.query : req.body.data
  );
  res.status(201).json({ data });
}

async function tableCanFitReservation(req, res, next) {
  const reservation = await reservationsService.listReservation(req.body.data)
  const table = await service.listTable(req.params.table_id)

    if(table[0].capacity < reservation[0].people) {
      next({
        status: 400,
        message: "The guest count must be less than the table's capacity"
      })
    } else {
      return next()
    }
}

async function tableIsFree(req, res, next) {
  const table = await service.listTable(req.params.table_id)

  if(table[0].reservation_id !== null) {
    next({
      status: 400,
      message: "This table is occupied."
    })
  } else {
    return next()
  }
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.listReservation(req.body.data)
  if(!reservation.length) {
    next({
      status: 404,
      message: `Reservation ${req.body.data.reservation_id} does not exist.`
    })
  } else {
    return next()
  }
}

function capacityIsANumber(req, res, next) {
  const capacity = req.body.data.capacity

  if (typeof capacity === "number") {
    return next()
  } else {
    next({
      status: 400,
      message: "The capacity must be a number."
    })
  }
}

async function update(req, res) {
  const updatedTable = await service.update(req.body.data, req.params.table_id)
  res.status(200).json({ data: updatedTable})
}

async function tableIsOccupied(req, res, next) {
  const table = await service.listTable(req.params.table_id)
  
  if (table[0].reservation_id === null) {
    next({
      status: 400,
      message: "This table is not occupied."
    })
  } return next()
}

async function tableExists(req, res, next) {
  const table = await service.listTable(req.params.table_id)

  if (!table.length){ 
    next({
      status: 404,
      message: `Table ${req.params.table_id} does not exist.`,
    });
  } else {
    return next();
  }
}

async function destroy(req, res) {
  const finishedTable = await service.destroy(req.params.table_id)
  res.status(200).json({ data: finishedTable })
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
      bodyHasData("table_name"), 
      bodyHasData("capacity"),
      nameLength,
      hasCapacity,
      capacityIsANumber,
      asyncErrorBoundary(create)
    ],
  update: [
    bodyHasData("reservation_id"),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableIsFree),
    asyncErrorBoundary(tableCanFitReservation),
    asyncErrorBoundary(update)
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(destroy)
  ]
};
