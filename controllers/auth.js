const model = require('../models/user');

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
exports.signout = async (req, res) => {
    res.clearCookie('userid')
    res.clearCookie('userrole')
    return res.redirect('/home/index');
}