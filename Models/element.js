const mongoose = require('mongoose');

var element = new mongoose.Schema({
    name: {
        type: String
    },
    element_type: {
        type: String
    },
    element_category: {
        type: String
    },
    image: {
        type: String
    }
   
});



module.exports=mongoose.model('element', element,'element');