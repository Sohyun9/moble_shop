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

router.route('/main/infoUpdate')
    .post(controller.controller.infoUpdate)

router.route('/rasberry')
    .post(controller.controller.rasberry)

router.route("/delete")
    .get(controller.controller.deleteMember)
    .post(controller.controller.deleteMember)

router.route("/popup")
    .get(controller.controller.popup)

router.route("/main/buy")
    .post(controller.controller.buy)

//구매페이지 메인
router.route('/purchase1')
    .get(controller.controller.purchase1)

router.route('/purchase2')
    .get(controller.controller.purchase2)

router.route('/purchase3')
    .get(controller.controller.purchase3)

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

//겨울옷
router.route('/winterc1')
    .get(controller.controller.winterc1)
    .post(controller.controller.winterc1)

router.route('/winterc2')
    .get(controller.controller.winterc2)
    .post(controller.controller.winterc2)

router.route('/winterc3')
    .get(controller.controller.winterc3)
    .post(controller.controller.winterc3)

router.route('/winterc4')
    .get(controller.controller.winterc4)
    .post(controller.controller.winterc4)

router.route('/winterc5')
    .get(controller.controller.winterc5)
    .post(controller.controller.winterc5)

router.route('/winterc6')
    .get(controller.controller.winterc6)
    .post(controller.controller.winterc6)

router.route('/springwarm1')
    .get(controller.controller.springwarm1)
    .post(controller.controller.springwarm1)

router.route('/springwarm2')
    .get(controller.controller.springwarm2)
    .post(controller.controller.springwarm2)

router.route('/springwarm3')
    .get(controller.controller.springwarm3)
    .post(controller.controller.springwarm3)

router.route('/springwarm4')
    .get(controller.controller.springwarm4)
    .post(controller.controller.springwarm4)

router.route('/springwarm5')
    .get(controller.controller.springwarm5)
    .post(controller.controller.springwarm5)

router.route('/springwarm6')
    .get(controller.output.springwarm6)
// .post(controller.controller.winterc1)

router.route('/springwarm7')
    .get(controller.output.springwarm7)
// .post(controller.controller.winterc1)

router.route('/springwarm8')
    .get(controller.output.springwarm8)
// .post(controller.controller.winterc1)

//코트페이지
router.route('/Coat')
    .get(controller.output.coat)

router.route('/Coat1')
    .get(controller.output.coat1)

router.route('/Coat2')
    .get(controller.output.coat2)

router.route('/Coat3')
    .get(controller.output.coat3)

router.route('/Coat4')
    .get(controller.output.coat4)

router.route('/Coat5')
    .get(controller.output.coat5)

router.route('/Coat6')
    .get(controller.controller.Coat6)

router.route('/Coat7')
    .get(controller.output.coat7)

router.route('/Coat8')
    .get(controller.output.coat8)

router.route('/drop')
    .get(controller.controller.deleteMember)

router.route('/loginCheck')
    .get(controller.controller.loginCheck)

//id를 고유값으로 설정하였기 때문에 중복확인을 위한 API
router.route('/idcheck')
    .get(controller.controller.checkId)

module.exports = router;