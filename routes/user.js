var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper')
const async = require('hbs/lib/async')


/* GET home page. */
var varifyLogin = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}
router.get('/', function (req, res, next) {
  res.render('userview/login');
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.render('userview/main-view')
  } else {
    res.render('user/login', { loginErr: req.session.userloginErr })
    req.session.userloginErr = false;
  }
})

router.get('/signup', (req, res) => {
  res.render('userview/signup')
})

router.post('/loginaction', (req, res) => {
  console.log(req.body)
})
module.exports = router;
