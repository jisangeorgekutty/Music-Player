var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper')
const async = require('hbs/lib/async')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('userview/user-view');
});

module.exports = router;
