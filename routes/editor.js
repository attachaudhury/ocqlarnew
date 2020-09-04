var express = require('express');
var router = express.Router();
const controller = require('../controllers/editor');
const auth = require('../middlewares/auth');

router.get('/index', auth, controller.index);


module.exports = router;