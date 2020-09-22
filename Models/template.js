const mongoose = require('mongoose');

var template = new mongoose.Schema({
    name: {
        type: String
    },
    template_type: {
        type: String
    },
    feature_type: {
        type: String
    },
    image: {
        type: String
    }
   
});



module.exports=mongoose.model('template', template,'template');