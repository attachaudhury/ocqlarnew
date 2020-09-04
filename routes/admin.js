var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const controller = require('../controllers/admin');

router.get('/index', auth, authorize(['admin']) , controller.index);

module.exports = router;