// array to store the registered email addresses
const keys = ['keyboard cat'];
const Cookies = require("cookies");
const db = require('../models/emailsList')
/**
 * This router uses cookies to check if the user has already registered,
 * if yes, it renders the 'register-password' view,
 * otherwise it redirects the user to '/register' route,
 * ensuring that only registered users can reach the password registration page.
 */
exports.getPasswordPage = (req, res) => {
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
};

/**
 * This router handles a POST request to the '/register-password' route,
 * it checks if the user is registered.
 * If everything is fine: push the email to the emails array,
 * and renders the 'index' view with a success message,
 * otherwise: redirects back to 'register'.
 */
exports.postPasswordPage = (req, res) => {
    // create a new cookies object and get the 'userDetails' cookie
    const cookies = new Cookies(req, res, {keys: keys});
    const userDetails = cookies.get('userDetails', {signed: true});

    // check if the 'userDetails' cookie exists - so user's session not expired
    if (userDetails) {
        // remove the 'userDetails' cookie
        let data = JSON.parse(userDetails);
        db.emails.push(data.email);
        cookies.set('userDetails', userDetails, {signed: true, maxAge: -1});
        // render the 'index' view with a success message
        res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: true});
    } else {
        // set a new cookie indicating that the user's session has expired,
        cookies.set('noDetailsFound', 'noDetailsFound', {signed: true, maxAge: 1000});
        res.redirect('/register');
    }
};
