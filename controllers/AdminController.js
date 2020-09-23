
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
var category = require('../Models/category');
var template = require('../Models/template');
var user = require('../Models/user');

const express = require('express');
const fse = require('fs-extra')
var router = express.Router();
var multiparty = require('multiparty');



router.get('/registration', auth, authorize(['admin']), (req, res) => {
  res.render("admin/modules/users/add_user");
});

router.all("/registration", auth, authorize(['admin']), async (req, res, next) => {
  if (req.method == "GET") {
    res.render('admin/modules/users/add_user');
  }
  else {
    var form = new multiparty.Form();
    form.parse(req, async (err, fields, files)=> {
      var tempimage = files.files[0];
      var store = new user();
      store.fname = fields.fname[0];
      store.lname = fields.lname[0];
      store.package = fields.package[0];
      store.email = fields.email[0];
      store.password = fields.password[0];

      store.image = "/uploads/" + Date.now() + ".png";
      
      fse.moveSync(tempimage.path, "public" + store.image, { overwrite: true });
      var result = await store.save();
      req.flash('insert_msg', 'Record Inserted Successfully!');
      res.redirect('/admin/user/list');
      
    })
  }
})



router.get('/', auth, authorize(['admin']), (req, res) => {
    res.render("admin/index");
});

  
router.all("/category", auth, authorize(['admin']), async (req, res, next) => {
    if (req.method == "GET") {
      res.render('admin/modules/category/addcategory', { message: 'You can add template here' });
    }
    else {
      var form = new multiparty.Form();
      form.parse(req, async (err, fields, files)=> {
        var tempimage = files.files[0];
        var store = new category();
        store.name = fields.name[0];
        store.cat_keywords = fields.cat_keywords[0];
        store.cat_type = fields.cat_type[0];
        store.featured_type = fields.featured_type[0];
        store.image = "/uploads/" + Date.now() + ".svg";
        
        fse.moveSync(tempimage.path, "public" + store.image, { overwrite: true });
        var result = await store.save();
        req.flash('insert_msg', 'Record Inserted Successfully!');
        res.redirect('/admin/category/list');
        
      })
    }
  })


router.get('/category/list', auth, authorize(['admin']), function(req, res) {
    category.find(function(err, category) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/modules/category/category_list', { category: category });
            // console.log(category);
        }
    });
});


router.get('/category/delete/:id',auth, authorize(['admin']), function(req, res) {
    category.findByIdAndRemove(req.params.id, function(err, project) {
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
    category.findById(req.params.id, function(err, category) {
        if (err) {
            console.log(err);
        } else {
            console.log(category);

            res.render('admin/modules/category/editcategory', { category: category });
        }
    });
});
/* UPDATE Category */
router.post('/category/update', auth, authorize(['admin']), async function(req, res) {
    console.log(req.body);
    var id = req.body._id;
    var obj = {...req.body};
    delete obj._id;
    var result = await category.findByIdAndUpdate(id, obj,{new:true});
    if(!result){
        req.flash('error_msg', 'Something went wrong! Category could not updated.');
        res.redirect('/admin/category/list/'+id);
    } else {
      req.flash('success_msg', 'Record Updated');
      res.redirect('/admin/category/list');
    }
    
  });



router.all("/template", auth, authorize(['admin']), async (req, res, next) => {
    if (req.method == "GET") {
      res.render('admin/modules/templates/static/template_add', { message: 'You can add template here' });
    }
    else {
      var form = new multiparty.Form();
      form.parse(req, async (err, fields, files)=> {
        var tempimage = files.files[0];
        var store = new template();
        store.name = fields.name[0];
        store.template_type = fields.template_type[0];
        store.feature_type = fields.feature_type[0];
        store.image = "/uploads/" + Date.now() + ".png";
        
        fse.moveSync(tempimage.path, "public" + store.image, { overwrite: true });
        var result = await store.save();
        req.flash('insert_msg', 'Record Inserted Successfully!');
        res.redirect('/admin/template/list');
        
      })
    }
  })
 

  router.get('/template/list', auth, authorize(['admin']), function(req, res) {
    var templetetype = req.params.templatetype || "static";
    template.find({template_type:templatetype},function(err, template) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     res.render('admin/modules/templates/static/template_list', { template: template });
        //     // console.log(category);
        // }
        if (templetetype =="static") {
          
          res.render('admin/modules/templates/static/template_list', { template: template,template_type:template_type});
      } else {
          // console.log(category);
          console.log(template_type);
      }
    });
});

router.get('/template/edit/:id', auth, authorize(['admin']), function(req, res) {
  console.log(req.params.id);
  template.findById(req.params.id, function(err, template) {
      if (err) {
          console.log(err);
      } else {
          console.log(template);

          res.render('admin/modules/templates/static/template_edit', { template: template });
      }
  });
});

/* UPDATE Template */
router.post('/template/update', auth, authorize(['admin']), async function(req, res) {
  console.log(req.body);
  var id = req.body._id;
  var obj = {...req.body};
  delete obj._id;
  var result = await template.findByIdAndUpdate(id, obj,{new:true});
  if(!result){
      req.flash('error_msg', 'Something went wrong! template could not updated.');
      res.redirect('/admin/template/list/'+id);
  } else {
    req.flash('success_msg', 'Record Updated');
    res.redirect('/admin/template/list');
  }
  
});

router.get('/template/delete/:id',auth, authorize(['admin']), function(req, res) {
  template.findByIdAndRemove(req.params.id, function(err, project) {
      if (err) {

          req.flash('error_msg', 'Record Not Deleted!');
          return res.redirect('back');
      } else {

          req.flash('success_msg', 'Record Deleted!');
          return res.redirect('back');
      }
  });
});

module.exports = router;