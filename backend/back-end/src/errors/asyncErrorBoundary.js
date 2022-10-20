// This function helps to resolve asynchrounous functions and is used in the exports of the controller files for "reservations" and "tables"

function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        console.error(error)
        next({
          status,
          message,
        });
      });
  };
};

module.exports = asyncErrorBoundary;
