var express = require('express');
var router = express.Router();
var emails = [ ];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , imglogo: '/images/0.png'});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' , imglogo: '/images/0.png', mailExists:false});
});

router.get('/register-password', function(req, res, next) {
  res.render('register-password', { title: 'Express' , imglogo: '/images/0.png', equalPassword:true});
});

router.post('/register', function(req, res, next) {
  if(emails.includes(req.body.email))
    res.render('register', { title: 'Express' , imglogo: '/images/0.png', mailExists:true });

  else
  {
    emails.push(req.body.email);
    res.render('register-password', { title: 'Express' , imglogo: '/images/0.png', mailExists:false, equalPassword:true});
  }
});

router.post('/register-password', function(req, res, next) {
  if(req.body.password === req.body.confirmPassword)
    res.render('index', { title: 'Express' , imglogo: '/images/0.png', equalPassword:true});
  else
    res.render('register-password', { title: 'Express' , imglogo: '/images/0.png', equalPassword:false});
});

module.exports = router;
