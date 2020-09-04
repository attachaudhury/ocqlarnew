var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/home');


router.get('/index',controller.index);
router.get('/templates',controller.templates);


module.exports = router;