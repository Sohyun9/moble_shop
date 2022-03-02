const controller = require("../controllers/controller.js");
const router = require("express").Router();
const session = require('express-session');

router.route('/')
    .get(controller.getMembers)
    .post(controller.insertMembers)

router.route('/login')
    .post(controller.loginMembers)

router.route('/logout')
    .get(controller.logoutMembers)

router.route('/drop')
    .get(controller.deleteMember)

router.route('/member')
    .get(controller.searchMembers)

router.route('/loginCheck')
    .get(controller.loginCheck)

router.route('/login/member/edit')
    .post(controller.infoUpdate)

//id를 고유값으로 설정하였기 때문에 중복확인을 위한 API
router.route('/idcheck')
    .get(controller.checkId)

module.exports = router;