const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
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



mongoose.model('Category', CategorySchema);