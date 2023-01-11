let express = require('express');
const Cookies = require('cookies')
const keys = ['keyboard cat'];
let router = express.Router();

let emails = [];

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: false});
});

router.get('/register', function (req, res) {
    // get the cookie
    const cookies = new Cookies(req, res, {keys: keys});

    let userDetails = cookies.get('userDetails', {signed: true});
    let beforeRefresh = cookies.get('refresh', {signed: true});
    let noDetailsFound = cookies.get('noDetailsFound', {signed: true});

    let data;

    // show error message if mail address already existed
    if (beforeRefresh && userDetails) {
        data = JSON.parse(userDetails);
        res.render('register', {
            title: 'Express',
            imgLogo: '/images/0.png',
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mailExists: true,
            cookieExpired: false
        });
    }

    // show error message if cookie time expire
    if (!beforeRefresh && !noDetailsFound) {
        if (userDetails) //not first entry
        {
            data = JSON.parse(userDetails);
            res.render('register', {
                title: 'Express',
                imgLogo: '/images/0.png',
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                mailExists: false,
                cookieExpired: false
            });
        } else   // first entry
            res.render('register', {
                title: 'Express', imgLogo: '/images/0.png', mailExists: false,
                cookieExpired: false, email: '', firstName: '', lastName: ''
            });
    } else    // cookie time expire
        res.render('register', {
            title: 'Express', imgLogo: '/images/0.png', mailExists: false,
            cookieExpired: true, email: '', firstName: '', lastName: ''
        });
});

router.get('/register-password', function (req, res) {

    const cookies = new Cookies(req, res, {keys: keys})
    // security reasons - make sure no one pass without registration
    if (cookies.get('userDetails', {signed: true}))
        res.render('register-password', {title: 'Express', imgLogo: '/images/0.png'});
    else
        res.redirect('/register')
});


router.post('/register', function (req, res) {

    const cookies = new Cookies(req, res, {keys: keys})

    // mail already exist
    let newCookie = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};
    cookies.set('userDetails', JSON.stringify(newCookie), {signed: true, maxAge: 10 * 1000});

    if (emails.includes(req.body.email)) {
        //set new cookie
        cookies.set('refresh', 'errorExist', {signed: true, maxAge: 1000});
        res.redirect('/register');
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
            res.render('register-password', {title: 'Express', imgLogo: '/images/0.png'});
    } else {
        //set new cookie
        cookies.set('noDetailsFound', 'noDetailsFound', {signed: true, maxAge: 1000});
        res.redirect('/register');
    }
});

module.exports = router;
