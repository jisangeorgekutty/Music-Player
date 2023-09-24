var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper')
const async = require('hbs/lib/async');
const { response } = require('../app');


/* GET home page. */
var varifyLogin = (req, res, next) => {
  if (req.session.userloggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}
router.get('/', function (req, res, next) {
  let user = req.session.userloggedIn
  console.log(user)
  if (user) {
    res.render('playview/main-view', { playclick: false })
  } else {
    res.render('userview/login');
  }
});

router.get('/login', (req, res) => {
  if (req.session.userloggedIn) {
    res.render('/')
  } else {
    res.render('userview/login', { loginErr: req.session.userloginErr })
    req.session.userloginErr = false;
  }
})

router.get('/signup', (req, res) => {
  res.render('userview/signup')
})

router.post('/loginaction', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.userloggedIn = true;
      console.log(response.user)
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.userloginErr = true
      res.redirect('/login')
    }
  })
})

router.post('/signupaction', (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    req.session.userloggedIn = true
    req.session.user = response
    res.redirect('/')
  })
})

router.get('/forgotpass', (req, res) => {
  res.render('userview/forgotpass');
})

router.post('/forgotaction', (req, res) => {
  userHelper.doForgotpass(req.body).then((response) => {
    if (response.status) {
      console.log("PASSWORD CHANGED")
      res.redirect('/')
    } else {
      res.render('userview/forgotpass', { DiffPass: true })
    }
  })
})

router.get('/test', (req, res) => {
  let user = req.session.user;
  res.render('playview/main-view')
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

// router.get('/play-song', (req, res) => {
//   console.log("playsong succes1")
//   res.json({ codStatus: true });
// })

// router.get('/play-click', (req, res) => {
//   console.log("playsong succes2")
//   res.render('playview/main-view', { playclick: true })
// })

module.exports = router;
