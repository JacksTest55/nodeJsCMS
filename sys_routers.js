var express = require('express');
var main = require('./controllers/sys/main');

var router = express.Router();

router.use('/*', function (req, res, next) {
  var user = req.session.sysUser;
  if(user){
    console.log("user name === " + user['login_name']);
  } else {
    console.log("user no login ");
  }
  var path = req.originalUrl;
  if (!user && path != '/sys/login') {
    if(req.xhr){
      res.send({status:"002",msg:"no login"});
    } else {
      res.redirect('/sys/login');
    }
  } else {
    next();
  }
});

router.get('/', function (req, res) {
  out(req, res, 'admin/index');
})

router.get('/login', function (req, res) {
  res.render('sys/login', {layout: null});
});

router.post('/login', main.login);

router.get('/logout', main.logout);

router.get('/user/list', function (req, res) {
  out(req, res, 'sys/user_list');
});

router.post('/user/list', main.page);

router.post('/user/add', main.save);

router.post('/user/repwd', main.repwd);

function out(req, res, view, data) {
  var user = req.session.sysUser;
  if (!data) data = {};
  data.layout = 'admin';
  data.loginname = user['login_name'];
  res.render(view, data);
}

module.exports = router;