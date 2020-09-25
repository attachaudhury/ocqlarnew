
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
var category = require('../Models/category');
var template = require('../Models/template');
var user = require('../Models/user');
var element = require('../Models/element');

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
      res.redirect('/admin');
      
    })
  }
})
router.get('/', auth, authorize(['admin']), function(req, res) {
  user.find(function(err, user) {
      if (err) {
          console.log(err);
      } else {
          res.render('admin/modules/users/index', { user: user });
          // console.log(category);
      }
  });
});

router.get('/user/edit/:id', auth, authorize(['admin']), function(req, res) {
  console.log(req.params.id);
  user.findById(req.params.id, function(err, user) {
      if (err) {
          console.log(err);
      } else {
          console.log(user);

          res.render('admin/modules/users/edit_user', { user: user });
      }
  });
});


router.get('/user/delete/:id',auth, authorize(['admin']), function(req, res) {
  user.findByIdAndRemove(req.params.id, function(err, project) {
      if (err) {

          req.flash('error_msg', 'Record Not Deleted!');
          return res.redirect('back');
      } else {

          req.flash('success_msg', 'Record Deleted!');
          return res.redirect('back');
      }
  });
});


router.get('/', auth, authorize(['admin']), (req, res) => {
    res.render("admin/modules/users/index");
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
        store.image = "/uploads/" + Date.now() + ".png";
        
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

  router.get('/template', auth, authorize(['admin']), function(req, res) {
    template.find(function(err, template) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/modules/templates/static/template_add', { template: template });
            // console.log(category);
        }
    });
});


router.post("/template", auth, authorize(['admin']), async (req, res, next) => {
    
    
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
        return res.redirect('back');
        
      })
  
  })
 

  router.get('/template/list', auth, authorize(['admin']), function(req, res) {
    var templatetype = req.query.templatetype || "static";
    console.log(templatetype)
    template.find({template_type:templatetype},function(err, template) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     res.render('admin/modules/templates/static/template_list', { template: template });
        //     // console.log(category);
        // }
        res.render('admin/modules/templates/static/template_add', { template: template,template_type:templatetype});
        if (templatetype =="static") {
          
      } else {
          // console.log(category);
          console.log(templatetype);
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




// Elements Create


router.post("/element", auth, authorize(['admin']), async (req, res, next) => {
  
  
    var form = new multiparty.Form();
    form.parse(req, async (err, fields, files)=> {
      var tempimage = files.files[0];
      var store = new element();
      store.name = fields.name[0];
      store.element_type = fields.element_type[0];
      store.element_category = fields.element_category[0];
      store.image = "/uploads/" + Date.now() + ".mp3";
      
      fse.moveSync(tempimage.path, "public" + store.image, { overwrite: true });
      var result = await store.save();
      req.flash('insert_msg', 'Record Inserted Successfully!');
      return res.redirect('back');
      
    })
  
})


router.get('/element', auth, authorize(['admin']), function(req, res) {
  

    category.find(function(err, category) {
    element.find(function(err, element) {
   
      if (err) {
          console.log(err);
      } else {
          res.render('admin/modules/elements/element_add', { category: category,element:element });
          // console.log(category);
      }
  });
});
});



module.exports = router;