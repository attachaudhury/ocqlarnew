const mongoose = require('mongoose');
const svgimage = mongoose.Schema({
    name:{type:String},
    path:{type:String},
    preview:{type:String},
})
module.exports = mongoose.model('svgimage',svgimage,'svgimage');