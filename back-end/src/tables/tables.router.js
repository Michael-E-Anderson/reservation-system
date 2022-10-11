const router = require("express").Router({ manageParams: true })
const controller = require("./tables.controller")

router.route("/").post(controller.create)


module.exports = router