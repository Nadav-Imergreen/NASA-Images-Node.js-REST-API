const Cookies = require('cookies');
const keys = ['keyboard cat'];
const db = require('../models/emailsList');

/**
 * GET register page
 * using cookies to store user data and check if the user's session is still valid
 * @param req
 * @param res
 */
exports.getRegisterPage = (req, res) => {
    // create a new cookies object
    const cookies = new Cookies(req, res, {keys: keys});

    // get the cookies with the given names
    let userDetails = cookies.get('userDetails', {signed: true});
    let beforeRefresh = cookies.get('refresh', {signed: true});
    let noDetailsFound = cookies.get('noDetailsFound', {signed: true});

    // hold data extracting from cookie
    let data;

    // If the user's session is valid and the email address they entered already exists,
    // show an error message to the user indicating that the email address is already in use.
    if (beforeRefresh && userDetails) {
        console.log('mail exist');
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
};

/**
 * This route handles registration requests,
 * stores the user's details in a cookie, and checks if the email already exists.
 * If it does, it redirects back to the registration page,
 * otherwise it redirects to the password registration page.
 * @param req
 * @param res
 */
exports.postRegisterPage = (req, res) => {
    // create a new cookies object
    const cookies = new Cookies(req, res, {keys: keys});

    // create a new cookie to store the user's email, first name, and last name
    let newCookie = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};
    cookies.set('userDetails', JSON.stringify(newCookie), {signed: true, maxAge: 30 * 1000});
    // check if the email address has already been registered
    if (db.emails.includes(req.body.email)) {
        // set a new cookie indicating that the email address is already in use
        cookies.set('refresh', 'errorExist', {signed: true, maxAge: 1000});
        res.redirect('/register');
    } else {
        res.redirect('register-password');
    }
};
