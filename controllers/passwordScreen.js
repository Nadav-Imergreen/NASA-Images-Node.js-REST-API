// array to store the registered email addresses
const keys = ['keyboard cat'];
const Cookies = require("cookies");
const db = require('../models')
const error = require('./error');
const bcrypt = require("bcrypt")

/**
 This router uses cookies to check if the user has already registered,
 if yes, it renders the 'register-password' view,
 otherwise it redirects the user to '/register' route,
 ensuring that only registered users can reach the password registration page.
 * @param req
 * @param res
 */
exports.getPasswordPage = (req, res) => {
    // create a new cookies object
    const cookies = new Cookies(req, res, {keys: keys});
    // security reasons - make sure no one pass without registration:
    // check if the 'userDetails' cookie exists, if it does, render the 'register-password' view
    try {
        if (cookies.get('userDetails', {signed: true})) {
            res.render('register-password', {title: 'Express', imgLogo: '/images/0.png'});
        }
        // if the 'userDetails' cookie does not exist, redirect to the '/register' route
        else
            res.redirect('/register');
    } catch (err) {
        error.get404(req, res)
    }

};

/**
 * This router handles a POST request to the '/register-password' route,
 * it checks if the user is registered.
 * If everything is fine: push the email to the emails array,
 * and renders the 'index' view with a success message,
 * otherwise: redirects back to 'register'.
 * @param req
 * @param res
 */
exports.postPasswordPage = (req, res) => {
    // create a new cookies object and get the 'userDetails' cookie
    const cookies = new Cookies(req, res, {keys: keys});
    const userDetails = cookies.get('userDetails', {signed: true});

    // check if the 'userDetails' cookie exists - so user's session not expired
    if (userDetails) {
        // store user data in sql db
        let data = JSON.parse(userDetails);
        hashPassword(data, req.body.password);
        // remove the 'userDetails' cookie
        cookies.set('userDetails', userDetails, {signed: true, maxAge: -1});
        // render the 'index' view with a success message
        res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: true, wrongEntryDetails: false});
    } else {
        // set a new cookie indicating that the user's session has expired,
        cookies.set('noDetailsFound', 'noDetailsFound', {signed: true, maxAge: 1000});
        res.redirect('/register');
    }
};

/**
 * this function hashes the user's password
 * and creates a new user in the database with hashed password.
 * @param data
 * @param password
 */
function hashPassword(data, password) {
    bcrypt.hash(password, 10)
        .then(hash => {
            db.Contact.create({
                firstName: data.firstName,
                lastName: data.lastName,
                mail: data.email,
                password: hash.toString()
            })
            console.log('hash: ' + hash);
        })
        .catch(err => {
            console.log(err);
        });
}