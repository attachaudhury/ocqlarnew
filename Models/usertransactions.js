const mongoose = require('mongoose');
const usertransactions = mongoose.Schema({
    date:Date,
    amount:Number,
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:false,default:null},
})
module.exports = mongoose.model('usertransactions',usertransactions,'usertransactions');
