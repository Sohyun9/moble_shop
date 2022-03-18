const express = require('express');
const bodyParser = require('body-parser');
const controller = require("../controllers/controller.js");
const router = require("express").Router();
const app = express();
app.use(bodyParser.json());

router.route('/')
    .get(controller.controller.getMembers)
    .post(controller.controller.insertMembers)

router.route('/login')
    .get(controller.output.login)
    .post(controller.controller.loginMembers)

router.route('/logout')
    .get(controller.controller.logoutMembers)

router.route('/drop')
    .get(controller.controller.deleteMember)

router.route('/member')
    .get(controller.controller.searchMembers)

router.route('/loginCheck')
    .get(controller.controller.loginCheck)

router.route('/login/member/edit')
    .post(controller.controller.infoUpdate)

//id를 고유값으로 설정하였기 때문에 중복확인을 위한 API
router.route('/idcheck')
    .get(controller.controller.checkId)

router.route('/idtest')
    .post(controller.controller.login)

module.exports = router;