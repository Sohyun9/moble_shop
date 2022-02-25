const controller = require("../controllers/controller.js");
const router = require("express").Router();
const session = require('express-session');

router.route('/')
    .get(controller.getMembers)
    .post(controller.insertMembers)

router.route('/login')
    .post(controller.loginMembers)

router.route('/member')
    .get(controller.searchMembers)

module.exports = router;