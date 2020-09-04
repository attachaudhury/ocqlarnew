const mongoose = require('mongoose');
const project = mongoose.Schema({
    name:{type:String},
    sound:{type:String},
    slides:[{}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:false,default:null},
})
module.exports = mongoose.model('project',project,'project');