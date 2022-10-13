const router = require("express").Router({ manageParams: true })
const controller = require("./tables.controller")

router.route("/").post(controller.create).get(controller.list)

router.route("/:table_id/seat/").put(controller.update)


module.exports = router