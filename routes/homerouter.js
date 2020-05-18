var express = require('express');
var router = express.Router();
var fs = require('fs');

var multiparty = require("multiparty");
var fse = require("fs-extra");
var auth = require('../middlewares/auth');

var user = require('../Models/user');
var project = require('../Models/project');
var svgimage = require('../Models/svgimage');
var slide = require('../Models/slide');
var music = require('../Models/music');

router.all("/login", async (req, res, next) => {
  if (req.body.username != undefined) {
    var result = await user.findOne({ username: req.body.username, password: req.body.password });
    console.log(result)
    if (result) {
      res.cookie('AuthToken', result._id);
      return res.redirect('/home/dashboard');
    }
    else {
      res.render('./login', {});
    }
  }
  else {
    res.render('./login');
  }
})
router.get("/logout", async (req, res, next) => {
  res.clearCookie('AuthToken')
  res.redirect('/home/login');
})
router.get("/dashboard", auth, async (req, res, next) => {
  res.render('dashboard', {});
})

router.get("/designer", auth, async (req, res, next) => {
  res.render('designer', {});
})
router.get("/myvideos", auth, async (req, res, next) => {
  res.render('myvideos', {});
})

//#region resources
router.get("/objectadd", auth, async (req, res, next) => {
  var model = new svgimage({});
  res.render('objectadd', {model:model});
})
router.get("/objectlist", auth, async (req, res, next) => {
  res.render('objectlist', {});
})
router.get("/slideadd", auth, async (req, res, next) => {
  res.render('slideadd', {});
})
router.get("/slidelist", auth, async (req, res, next) => {
  res.render('slidelist', {});
})
//#endregion resources



//#region user
router.get("/useradd", auth, async (req, res, next) => {
  var model = new user({});
  res.render('useradd', { model: model });
})
router.post("/useradd", auth, async (req, res, next) => {
  var newuser = { ...req.body };
  newuser.role="user";
  var result = await user.create(newuser);
  return res.redirect('/home/useredit?id=' + result._id);
})
router.get("/useredit", auth, async (req, res, next) => {
  var result = await user.findById(req.query.id);
  res.render('useredit', { model: result });
})
router.post("/useredit", auth, async (req, res, next) => {
  var updateduserobject = { ...req.body };
  var updateduserobjectid = updateduserobject._id;
  delete updateduserobject._id;

  updateduserobject.role="user";
  var result = await user.findByIdAndUpdate(updateduserobjectid, updateduserobject, { new: true });
  res.redirect('/home/useredit?id=' + result._id);
})
router.get("/userlist", auth, async (req, res, next) => {
  var result = await user.find({});
  res.render('userlist', { model: result });
})
//#endregion user



module.exports = router;