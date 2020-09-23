// #region variables 
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var engine = require('ejs-locals')
var mongoose = require("mongoose")
var app = express();
var flash = require('req-flash');
var session  = require('express-session');
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var createError = require('http-errors');

//models
var user = require('./models/user')
var cat = require('./Models/category');
var temp = require('./Models/template');
//routes
var authrouter = require('./routes/auth');
var homerouter = require('./routes/home');
var editorrouter = require('./routes/editor');
//  var adminrouter = require('./routes/admin');
var userrouter = require('./routes/user');
var AdminController = require('./controllers/AdminController');


mongoose.connect('mongodb://localhost:27017/ocqlar', {
  useNewUrlParser: true, useUnifiedTopology: true
});
app.use(bodyParser.json({
  limit: '100mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, PATCH, OPTIONS,DELETE");
  next()
});
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

app.use(flash());
 
// Global variables
app.use(function(req, res, next){
 res.locals.success_msg = req.flash('success_msg');
 res.locals.insert_msg = req.flash('insert_msg');

 res.locals.error_msg = req.flash('error_msg');
 res.locals.error = req.flash('error');
 next();
});
app.use(express.static("public"));


app.use('/auth', authrouter);
app.use('/home', homerouter);
app.use('/editor', editorrouter);
app.use('/admin', AdminController);
app.use('/user', userrouter);

app.use('/', (req,res)=>{
  res.redirect('/home/index')
});


//  dbsetting();
async function dbsetting() {
  await user.remove({});

  var adminuser = await user.findOne({ email: 'admin@admin.com', role: 'admin' });
  if (!adminuser) {
    await user.create({
      activestatus:"active",
      email: "admin@admin.com",
      fullname: 'admin',
      password:"admin@123",
      role: 'admin',
    })
  }
  var adminuser = await user.findOne({ email: 'user@user.com', role: 'user' });
  if (!adminuser) {
    await user.create({
      activestatus:"active",
      email: "user@user.com",
      fullname: 'user',
      password:"user@123",
      role: 'user',
    })
  }
}


module.exports = app;