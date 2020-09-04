var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

const controller = require('../controllers/user');
router.get('/index',auth, controller.index);
module.exports = router;