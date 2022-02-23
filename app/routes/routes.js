const controller = require("../controllers/controller.js");
const router = require("express").Router();

router.route('/')
    .get(controller.getMembers)
    .put(controller.insertMembers)

module.exports = router;