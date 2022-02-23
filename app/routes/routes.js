const controller = require("../controllers/controller.js");
const router = require("express").Router();

router.route('/')
    .get(controller.getMembers)
    .post(controller.insertMembers)

router.route('/find/:id')
    .get(controller.searchMembers)

module.exports = router;