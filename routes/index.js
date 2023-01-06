var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , imglogo: '/images/0.png'});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' , imglogo: '/images/0.png'});
});

router.get('/register-password', function(req, res, next) {
  res.render('register-password', { title: 'Express' , imglogo: '/images/0.png'});
});

module.exports = router;
