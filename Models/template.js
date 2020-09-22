const mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
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



mongoose.model('Template', TemplateSchema);