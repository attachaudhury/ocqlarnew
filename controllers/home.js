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
exports.about = async (req, res) => {
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
   return res.render('home/about',{data:responseobject});

}

exports.signin = async (req, res) => {
    if (req.method == "GET") {
        return res.redirect('/home/index');
    }
    else {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var user = await model.findOne({ email: email, password: password, activestatus: { $in: [null, undefined, "active"] } });
        
        if (user) {
            console.log('user loggedin')
            console.log('user loggedin')
            res.cookie('userid', user._id);
            res.cookie('userrole', user.role);
            return res.redirect('/editor/index');
        }
        else {
            console.log('user not loggedin')
            return res.redirect('/home/index');
        }
    }
}