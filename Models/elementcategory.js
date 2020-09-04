const mongoose = require('mongoose');
const element = mongoose.Schema({
    name:{type:String},
    path:{type:String},
    preview:{type:String},
})
module.exports = mongoose.model('element',svgimage,'element');