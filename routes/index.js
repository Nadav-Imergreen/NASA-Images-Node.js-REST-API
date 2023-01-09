var express = require('express');
const Cookies = require('cookies')
var router = express.Router();

var emails = [];
const keys = ['keyboard cat'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express' , imglogo: '/images/0.png'});
});

router.get('/register', function(req, res, next) {
    // get the cookie
  const cookies = new Cookies(req, res, { keys: keys});
  const email = cookies.get('email', { signed: true });
  // load page content to browser
  res.render('register', {title: 'Express' , imglogo: '/images/0.png', mailExists:false, email: email});
});

router.get('/register-password', function(req, res, next) {
    res.render('register-password', {title: 'Express' , imglogo: '/images/0.png', equalPassword:true});
});


router.post('/register', function(req, res, next) {

    const cookies = new Cookies(req, res, { keys: keys})
    const notFirstVisit = cookies.get('email', {signed: true });

    if (!notFirstVisit)
    //set new cookie
    cookies.set('email' ,req.body.email, {signed: true, maxAge: 30*1000 });

    if(emails.includes(req.body.email))
        res.render('register', {title: 'Express' , imglogo: '/images/0.png', mailExists: true, email: notFirstVisit});
    else
    {
      emails.push(req.body.email);
      res.redirect('register-password');
    }
});

router.post('/register-password', function(req, res, next) {

  if(req.body.password === req.body.confirmPassword)
      res.redirect('/')
  else
      res.render('register-password', {title: 'Express' , imglogo: '/images/0.png', equalPassword: false});
});

module.exports = router;
