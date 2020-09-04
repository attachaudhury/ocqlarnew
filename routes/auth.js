var express = require('express');
var router = express.Router();

const controller = require('../controllers/auth');

router.all('/signin', controller.signin);
router.all('/signout', controller.signout);
module.exports = router;


