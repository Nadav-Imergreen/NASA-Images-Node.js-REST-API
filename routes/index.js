var express = require('express');
const Cookies = require('cookies')
var router = express.Router();

var emails = [];
const keys = ['keyboard cat'];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', imgLogo: '/images/0.png'});
});

router.get('/register', function (req, res, next) {
    // get the cookie
    const cookies = new Cookies(req, res, {keys: keys});
    const userDetails = cookies.get('userDetails', {signed: true});
    if (userDetails)
    {
        let data = JSON.parse(userDetails);
        // load page content to browser
        res.render('register', {title: 'Express', imgLogo: '/images/0.png', mailExists: false,
            email: data.email,   firstName: data.firstName, lastName: data.lastName});
    }
    else
    {
        res.render('register', {title: 'Express', imgLogo: '/images/0.png', mailExists: false,
            email:'', firstName: '', lastName: ''});
    }
});

router.get('/register-password', function (req, res, next) {
    res.render('register-password', {title: 'Express', imgLogo: '/images/0.png', equalPassword: true});
});


router.post('/register', function (req, res, next) {

    const cookies = new Cookies(req, res, {keys: keys})
    const userDetails = cookies.get('userDetails', {signed: true});

    if (!userDetails) {
        //set new cookie
        let newCookie = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        cookies.set('userDetails', JSON.stringify(newCookie), {signed: true, maxAge: 30 * 1000});
    }

    if (emails.includes(req.body.email))
    {
        let data = JSON.parse(userDetails);

        res.render('register', {title: 'Express', imgLogo: '/images/0.png', mailExists: true,
            email: data.email,   firstName: data.firstName, lastName: data.lastName});
    }
    else {
        emails.push(req.body.email);
        res.redirect('register-password');
    }
});

router.post('/register-password', function (req, res, next) {

    if (req.body.password === req.body.confirmPassword)
        res.redirect('/')
    else
        res.render('register-password', {title: 'Express', imgLogo: '/images/0.png', equalPassword: false});
});

module.exports = router;
