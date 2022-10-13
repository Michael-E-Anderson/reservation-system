const service = require("./tables.service");
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



async function update(req, res) {
  console.log(req.body.data, 123);
  const updatedTable = await service.update(req.body.data)
  

  res.status(201).json({ data: updatedTable})
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
      bodyHasData("table_name"), 
      bodyHasData("capacity"),
      nameLength,
      hasCapacity,
      asyncErrorBoundary(create)
    ],
  update: [asyncErrorBoundary(update)]
};
