const express = require('express');
const bodyParser = require('body-parser');
const controller = require("../controllers/controller.js");
const router = require("express").Router();
const app = express();
app.use(bodyParser.json());

router.route('/')
    .get(controller.output.home)

router.route('/main')
    .get(controller.output.main)

router.route('/register')
    .get(controller.output.register)
    .post(controller.controller.insertMembers)

router.route('/login')
    .get(controller.output.login)
    .post(controller.controller.loginMembers)

router.route('/main/mypage')
    .get(controller.controller.mypage)

router.route('/logout')
    .get(controller.controller.logoutMembers)
    .post(controller.controller.logoutMembers)

router.route('/infoUpdate')
    .get(controller.output.infoUpdate)
    .post(controller.controller.infoUpdate)

router.route('/rasberry')
    .post(controller.controller.rasberry)

router.route("/delete")
    .get(controller.controller.deleteMember)
    .post(controller.controller.deleteMember)

router.route('/purchase1')
    .get(controller.output.purchase1)

router.route('/purchase2')
    .get(controller.output.purchase2)

router.route('/purchase3')
    .get(controller.output.purchase3)

router.route('/purchase4')
    .get(controller.output.purchase4)

router.route('/purchase5')
    .get(controller.output.purchase5)

router.route('/purchase6')
    .get(controller.output.purchase6)

router.route('/purchase7')
    .get(controller.output.purchase7)

router.route('/purchase8')
    .get(controller.output.purchase8)

router.route('/winterc1')
    .get(controller.output.winterc1)

router.route('/winterc2')
    .get(controller.output.winterc2)

router.route('/winterc3')
    .get(controller.output.winterc3)

router.route('/winterc4')
    .get(controller.output.winterc4)

router.route('/winterc5')
    .get(controller.output.winterc5)

router.route('/winterc6')
    .get(controller.output.winterc6)

router.route('/drop')
    .get(controller.controller.deleteMember)

router.route('/loginCheck')
    .get(controller.controller.loginCheck)

//id를 고유값으로 설정하였기 때문에 중복확인을 위한 API
router.route('/idcheck')
    .get(controller.controller.checkId)

module.exports = router;