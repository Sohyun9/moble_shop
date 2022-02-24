const controller = require("../controllers/controller.js");
const router = require("express").Router();

router.route('/')
    .get(controller.getMembers)
    .post(controller.insertMembers)

router.route('/login')
    .get(controller.loginMembers)

module.exports = router;