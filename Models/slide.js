const mongoose = require('mongoose');
const slide = mongoose.Schema({
    name:{type:String},
    path:{type:String},
    preview:{type:String},
})
module.exports = mongoose.model('slide',slide,'slide');