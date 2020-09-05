var user = require('../models/user')


exports.index = async (req, res) => {
   var userid = req.cookies['userid'];
   var responseobject = {};
   var loggedinuser = await user.findById(userid);
   if(loggedinuser)
   {
      responseobject.isloggedin = true;
      responseobject.loggedinuser = loggedinuser;
   }
   else{
      responseobject.isloggedin = false;
      responseobject.loggedinuser = loggedinuser;
   }
   return res.render('home/index',{data:responseobject});
}
exports.templates = async (req, res) => {
   var userid = req.cookies['userid'];
   var responseobject = {};
   var loggedinuser = await user.findById(userid);
   if(loggedinuser)
   {
      responseobject.isloggedin = true;
      responseobject.loggedinuser = loggedinuser;
   }
   else{
      responseobject.isloggedin = false;
      responseobject.loggedinuser = loggedinuser;
   }
   return res.render('home/templates',{data:responseobject});
}