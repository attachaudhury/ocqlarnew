const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const user = mongoose.Schema({
    activestatus:{type:String,required:false,default:'active'},
    createddate:{type:Date,required:false},
    email:{type:String,unique:true,required:false},
    fullname:{type:String,required:false},
    lastlogindate:{type:Date,required:false},
    image:{type:String,required:false},
    membershiptype:{type:String,required:false},
    membershipexpireydate:{type:Date,required:false},
    phone:{type:String,required:false},
    password:{type:String,required:false},
    role:{type:String,required:false},
    registeredthrough:{type:String,required:false},
})
user.plugin(validator)
module.exports = mongoose.model('user',user,'user');
