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

router.route("/:reservation_Id").get(controller.listReservation)



module.exports = router;
