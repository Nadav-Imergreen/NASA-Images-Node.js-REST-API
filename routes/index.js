let express = require('express');
const Cookies = require('cookies')
let router = express.Router();

let emails = [];
const keys = ['keyboard cat'];

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: false});
});

router.get('/register/:cookieTime', function (req, res) {
    // get the cookie
    const cookies = new Cookies(req, res, {keys: keys});

    let userDetails = cookies.get('userDetails', {signed: true});
    let refreshErrors = cookies.get('refreshErrors', {signed: true});

    if (refreshErrors) {
        if (userDetails) {
            let data = JSON.parse(userDetails);
            res.render('register', {
                title: 'Express', imgLogo: '/images/0.png', mailExists: true,
                cookieExpired: false, email: data.email, firstName: data.firstName, lastName: data.lastName
            });
        }
    }

    if (req.params.cookieTime !== 'expire') // cookie time not expire
    {
        if (userDetails) //not first entry
        {
            let data = JSON.parse(userDetails);
            // load page content to browser
            res.render('register', {
                title: 'Express', imgLogo: '/images/0.png', mailExists: false,
                cookieExpired: false, email: data.email, firstName: data.firstName, lastName: data.lastName
            });
        } else // first entry
            res.render('register', {
                title: 'Express', imgLogo: '/images/0.png', mailExists: false,
                cookieExpired: false, email: '', firstName: '', lastName: ''
            });
    } else // cookie time expire
        res.render('register', {
            title: 'Express', imgLogo: '/images/0.png', mailExists: false,
            cookieExpired: true, email: '', firstName: '', lastName: ''
        });

});

router.get('/register-password', function (req, res) {

    const cookies = new Cookies(req, res, {keys: keys})
    if (cookies.get('userDetails', {signed: true}))
        res.render('register-password', {title: 'Express', imgLogo: '/images/0.png', equalPassword: true});
    else
        res.redirect('/register/notExpire')
});


router.post('/register', function (req, res) {

    const cookies = new Cookies(req, res, {keys: keys})

    // mail already exist
    let newCookie = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};
    cookies.set('userDetails', JSON.stringify(newCookie), {signed: true, maxAge: 10 * 1000});

    if (emails.includes(req.body.email)) {

        //set new cookie
        cookies.set('refreshErrors', 'errorExist', {signed: true, maxAge: 1000});

        res.redirect('/register/notExpire');
    } else
        res.redirect('register-password');
});

router.post('/register-password', function (req, res) {

    const cookies = new Cookies(req, res, {keys: keys});
    const userDetails = cookies.get('userDetails', {signed: true});
    let data;

    if (userDetails) {
        if (req.body.password === req.body.confirmPassword) {
            data = JSON.parse(userDetails);
            emails.push(data.email);
            cookies.set('userDetails', userDetails, {signed: true, maxAge: -1});
            res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: true});
        } else
            res.render('register-password', {title: 'Express', imgLogo: '/images/0.png', equalPassword: false});
    } else
        res.redirect('/register/expire');

});

module.exports = router;
