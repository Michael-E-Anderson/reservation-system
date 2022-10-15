/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router({ manageParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router.route("/").get(controller.list);

router.route("/").post(controller.create)

router
  .route("/:reservation_id")
  .get(controller.listReservation)
  .put(controller.update);

router.route("/:reservation_id/status").put(controller.update);

// router.route("/:reservation_Id")



module.exports = router;
