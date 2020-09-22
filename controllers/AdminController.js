
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const Category = mongoose.model('Category');
const Template = mongoose.model('Template');
var category = require('../Models/category');
var template = require('../Models/template');
// var multer  = require('multer');
const express = require('express');
const fse = require('fs-extra')

var router = express.Router();
var multiparty = require('multiparty');

router.get('/', auth, authorize(['admin']), (req, res) => {
    res.render("admin/index");
});
router.get('/category', auth, authorize(['admin']), (req, res) => {
    res.render("admin/addcategory");
});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null,  file.originalname)
//     }
//   })
  
//   var upload = multer({ storage: storage })
  
  

router.post('/category', auth, authorize(['admin']), (req, res) => {
    var category = new Category();
    category.name = req.body.name;
    category.cat_keywords = req.body.cat_keywords;
    category.cat_type = req.body.cat_type;
    category.featured_type = req.body.featured_type;
    category.image = req.file.image;
   
    category.save();
        
    res.redirect('category/list');
    console.log(req.file);

});
router.get('/category/list', auth, authorize(['admin']), function(req, res) {
    Category.find(function(err, category) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/category_list', { category: category });
            // console.log(category);
        }
    });
});


router.get('/category/delete/:id',auth, authorize(['admin']), function(req, res) {
    Category.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {

            req.flash('error_msg', 'Record Not Deleted!');
            return res.redirect('back');
        } else {

            req.flash('success_msg', 'Record Deleted!');
            return res.redirect('back');
        }
    });
});
router.get('/category/edit/:id', auth, authorize(['admin']), function(req, res) {
    console.log(req.params.id);
    Category.findById(req.params.id, function(err, category) {
        if (err) {
            console.log(err);
        } else {
            console.log(category);

            res.render('admin/editcategory', { category: category });
        }
    });
});
/* UPDATE Category */
router.post('/category/update', auth, authorize(['admin']), async function(req, res) {
    console.log(req.body);
    var id = req.body._id;
    var obj = {...req.body};
    delete obj._id;
    var result = await Category.findByIdAndUpdate(id, obj,{new:true});
    if(!result){
        req.flash('error_msg', 'Something went wrong! Category could not updated.');
        res.redirect('/admin/category/list/'+id);
    } else {
      req.flash('success_msg', 'Record Updated');
      res.redirect('/admin/category/list');
    }
    
  });



router.all("/templateadd", auth, authorize(['admin']), async (req, res, next) => {
    var loggedinuser = await Template.findById(req.template);
    if (req.method == "GET") {
      res.render('admin/templates/static/template_add', { message: 'You can add template here', loggedinuser: loggedinuser });
    }
    else {
      var form = new multiparty.Form();
      form.parse(req, async function (err, fields, files) {
        var tempimage = files.files[0];
        var name = fields.name[0];
        var template_type = fields.template_type[0];
        var feature_type = fields.feature_type[0];
        var tempimagename = "/uploads/" + Date.now() + ".png";
        var object = {
          name: name,
          template_type: template_type,
          feature_type: feature_type,
          image: tempimagename
        }
        fse.moveSync(tempimage.path, "public" + tempimagename, { overwrite: true });
        var result = await template.create(object);
        res.render('admin/templates/static/template_add', { message: 'Template successfully Saved', loggedinuser: loggedinuser });
      })
    }
  })
 
module.exports = router;