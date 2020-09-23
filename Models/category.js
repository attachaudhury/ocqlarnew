const mongoose = require('mongoose');

var category = new mongoose.Schema({
    name: {
        type: String,
       
    },
    cat_keywords: {
        type: String
    },
    cat_type: {
        type: String
    },
    image: {
        type: String
    },
    featured_type: {
        type: String
    }
   
});



module.exports=mongoose.model('category', category,'category');