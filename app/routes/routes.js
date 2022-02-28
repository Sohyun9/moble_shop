const controller = require("../controllers/controller.js");
const router = require("express").Router();
const session = require('express-session');

router.route('/')
    .get(controller.getMembers)
    .post(controller.insertMembers)

router.route('/login')
    .post(controller.loginMembers)

router.route('/logout')
    .post(controller.logoutMembers)

router.route('/member')
    .get(controller.searchMembers)

router.route('/loginCheck')
    .get(controller.loginCheck)

module.exports = router;