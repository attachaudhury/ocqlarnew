const mongoose = require('mongoose');
const music = mongoose.Schema({
    name:{type:String},
    path:{type:String},
})
module.exports = mongoose.model('music',music,'music');