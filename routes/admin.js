var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const AdminController = require('../controllers/AdminController');

router.get('/index', auth, authorize(['admin']) , AdminController.index);


module.exports = router;