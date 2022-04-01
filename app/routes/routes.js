const express = require('express');
const bodyParser = require('body-parser');
const controller = require("../controllers/controller.js");
const router = require("express").Router();
const app = express();
app.use(bodyParser.json());

router.route('/')
    .get(controller.output.home)

router.route('/main')
    .get(controller.controller.main)
    .post(controller.controller.main)

router.route('/register')
    .get(controller.output.register)
    .post(controller.controller.insertMembers)

router.route('/login')
    .get(controller.output.login)
    .post(controller.controller.loginMembers)

router.route('/logout')
    .get(controller.controller.logoutMembers)
    .post(controller.controller.logoutMembers)

router.route("/delete")
    .get(controller.controller.deleteMember)
    .post(controller.controller.deleteMember)

router.route('/main/mypage')
    .get(controller.controller.mypage)

router.route('/main/infoUpdate')
    .post(controller.controller.infoUpdate)

//라즈베리로부터 퍼스널컬러 가져오기
router.route('/rasberry')
    .post(controller.controller.rasberry)

//구매이력페이지
router.route("/popup")
    .get(controller.controller.popup)

//장바구니페이지
router.route("/popup2")
    .get(controller.controller.popup2)

//구매 API
router.route("/main/buy")
    .post(controller.controller.buy)

router.route("/main/basket")
    .post(controller.controller.basket)

router.route("/go_buy")
    .get(controller.controller.go_buy)
    .post(controller.controller.go_buy)

//구매페이지 메인
router.route('/purchase1')
    .get(controller.controller.purchase1)

router.route('/purchase2')
    .get(controller.controller.purchase2)

router.route('/purchase3')
    .get(controller.controller.purchase3)

router.route('/purchase4')
    .get(controller.controller.purchase4)

router.route('/purchase5')
    .get(controller.controller.purchase5)

router.route('/purchase6')
    .get(controller.controller.purchase6)

router.route('/purchase7')
    .get(controller.controller.purchase7)

router.route('/purchase8')
    .get(controller.controller.purchase8)

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

//봄웜톤
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
    .get(controller.controller.springwarm6)
    .post(controller.controller.springwarm6)

router.route('/springwarm7')
    .get(controller.controller.springwarm7)
    .post(controller.controller.springwarm7)

router.route('/springwarm8')
    .get(controller.controller.springwarm8)
    .post(controller.controller.springwarm8)

//여름쿨톤
router.route('/summercool1')
    .get(controller.controller.summercool1)
    .post(controller.controller.summercool1)

router.route('/summercool2')
    .get(controller.controller.summercool2)
    .post(controller.controller.summercool2)

router.route('/summercool3')
    .get(controller.controller.summercool3)
    .post(controller.controller.summercool3)

router.route('/summercool4')
    .get(controller.controller.summercool4)
    .post(controller.controller.summercool4)

//가을웜톤
router.route('/autumnwarm1')
    .get(controller.controller.autumnwarm1)
    .post(controller.controller.autumnwarm1)

router.route('/autumnwarm2')
    .get(controller.controller.autumnwarm2)
    .post(controller.controller.autumnwarm2)

router.route('/autumnwarm3')
    .get(controller.controller.autumnwarm3)
    .post(controller.controller.autumnwarm3)

router.route('/autumnwarm3')
    .get(controller.controller.autumnwarm3)
    .post(controller.controller.autumnwarm3)

//겨울쿨톤
router.route('/wintercool1')
    .get(controller.controller.wintercool1)
    .post(controller.controller.wintercool1)

router.route('/wintercool2')
    .get(controller.controller.wintercool2)
    .post(controller.controller.wintercool2)

router.route('/wintercool3')
    .get(controller.controller.wintercool3)
    .post(controller.controller.wintercool3)

router.route('/wintercool4')
    .get(controller.controller.wintercool4)
    .post(controller.controller.wintercool4) 

//여름옷
router.route('/summerc1')
    .get(controller.controller.summerc1)
    .post(controller.controller.summerc1)

router.route('/summerc2')
    .get(controller.controller.summerc2)
    .post(controller.controller.summerc2)

router.route('/summerc3')
    .get(controller.controller.summerc3)
    .post(controller.controller.summerc3)

router.route('/summerc4')
    .get(controller.controller.summerc4)
    .post(controller.controller.summerc4)

router.route('/summerc5')
    .get(controller.controller.summerc5)
    .post(controller.controller.summerc5)

router.route('/summerc6')
    .get(controller.controller.summerc6)
    .post(controller.controller.summerc6)

router.route('/summerc7')
    .get(controller.controller.summerc7)
    .post(controller.controller.summerc7)

router.route('/summerc8')
    .get(controller.controller.summerc8)
    .post(controller.controller.summerc8)

//코트페이지
router.route('/Coat')
    .get(controller.output.coat)

router.route('/Coat1')
    .get(controller.controller.Coat1)

router.route('/Coat2')
    .get(controller.controller.Coat2)

router.route('/Coat3')
    .get(controller.controller.Coat3)

router.route('/Coat4')
    .get(controller.controller.Coat4)

router.route('/Coat5')
    .get(controller.controller.Coat5)

router.route('/Coat6')
    .get(controller.controller.Coat6)

router.route('/Coat7')
    .get(controller.controller.Coat7)

router.route('/Coat8')
    .get(controller.controller.Coat8)

router.route('/drop')
    .get(controller.controller.deleteMember)

router.route('/loginCheck')
    .get(controller.controller.loginCheck)

//id를 고유값으로 설정하였기 때문에 중복확인을 위한 API
router.route('/idcheck')
    .get(controller.controller.checkId)

router.route('/p_send')
    .get(controller.controller.p_send)
    .post(controller.controller.p_send)

module.exports = router;