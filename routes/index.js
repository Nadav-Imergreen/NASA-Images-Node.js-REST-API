let express = require('express');
const Cookies = require('cookies');
const keys = ['keyboard cat'];
let router = express.Router();

// array to store the registered email addresses
let emails = [];
/**
 * GET home page
 */
router.get('/', function (req, res) {
    //render the index view and provide a title, imgLogo, and RegistrationSucceeded to be used in the view
    res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: false});
});

/**
 * GET register page
 * using cookies to store user data and check if the user's session is still valid
 *
 */
router.get('/register', function (req, res) {
    // create a new cookies object
    const cookies = new Cookies(req, res, {keys: keys});

    // get the cookies with the given names
    let userDetails = cookies.get('userDetails', {signed: true});
    let beforeRefresh = cookies.get('refresh', {signed: true});
    let noDetailsFound = cookies.get('noDetailsFound', {signed: true});

    let data;

    // If the user's session is valid and the email address they entered already exists,
    // show an error message to the user indicating that the email address is already in use.
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

    // If the user's session has expired,
    // shows the registration form with no previously entered information, and a warning
    if (!beforeRefresh && !noDetailsFound) {
        if (userDetails) { // not the first entry
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
        } else  // first entry
            res.render('register', {
                title: 'Express', imgLogo: '/images/0.png', mailExists: false,
                cookieExpired: false, email: '', firstName: '', lastName: ''
            });
    } else  // cookie time expired
        res.render('register', {
            title: 'Express', imgLogo: '/images/0.png', mailExists: false,
            cookieExpired: true, email: '', firstName: '', lastName: ''
        });
});

/**
 * This router uses cookies to check if the user has already registered,
 * if yes, it renders the 'register-password' view,
 * otherwise it redirects the user to '/register' route,
 * ensuring that only registered users can reach the password registration page.
 */
router.get('/register-password', function (req, res) {
    // create a new cookies object
    const cookies = new Cookies(req, res, {keys: keys});
    // security reasons - make sure no one pass without registration:
    // check if the 'userDetails' cookie exists, if it does, render the 'register-password' view
    if (cookies.get('userDetails', {signed: true})) {
        res.render('register-password', {title: 'Express', imgLogo: '/images/0.png'});
    }
    // if the 'userDetails' cookie does not exist, redirect to the '/register' route
    else {
        res.redirect('/register');
    }
});
/**
 * This route handles registration requests,
 * stores the user's details in a cookie, and checks if the email already exists.
 * If it does, it redirects back to the registration page,
 * otherwise it redirects to the password registration page.
 */
router.post('/register', function (req, res) {
    // create a new cookies object
    const cookies = new Cookies(req, res, {keys: keys});

    // create a new cookie to store the user's email, first name, and last name
    let newCookie = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};
    cookies.set('userDetails', JSON.stringify(newCookie), {signed: true, maxAge: 10 * 1000});

    // check if the email address has already been registered
    if (emails.includes(req.body.email)) {
        // set a new cookie indicating that the email address is already in use
        cookies.set('refresh', 'errorExist', {signed: true, maxAge: 1000});
        res.redirect('/register');
    } else {
        res.redirect('register-password');
    }
});
/**
 * This router handles a POST request to the '/register-password' route,
 * it checks if the user is registered.
 * If everything is fine: push the email to the emails array,
 * and renders the 'index' view with a success message,
 * otherwise: redirects back to 'register'.
 */
router.post('/register-password', function (req, res) {
    // create a new cookies object and get the 'userDetails' cookie
    const cookies = new Cookies(req, res, {keys: keys});
    const userDetails = cookies.get('userDetails', {signed: true});

    // check if the 'userDetails' cookie exists - so user's session not expired
    if (userDetails) {
        // remove the 'userDetails' cookie
        cookies.set('userDetails', userDetails, {signed: true, maxAge: -1});
        // render the 'index' view with a success message
        res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: true});
    } else {
        // set a new cookie indicating that the user's session has expired,
        cookies.set('noDetailsFound', 'noDetailsFound', {signed: true, maxAge: 1000});
        res.redirect('/register');
    }
});

module.exports = router;
