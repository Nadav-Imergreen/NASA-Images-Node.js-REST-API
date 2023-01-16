//contain the Contact model, which is accessible via db.user
const db = require('../models');
const bcrypt = require("bcrypt");
/**
 * this function takes a request and response object, it renders an 'index' view.
 * @param req
 * @param res
 */
exports.getLoginPage = (req, res) => {
    //render the index view and provide a title, imgLogo, and RegistrationSucceeded to be used in the view
    res.render('index', {
        title: 'Express',
        RegistrationSucceeded: false,
        wrongEntryDetails: false
    });
};

/**
 * this function takes a request and response object,
 * it uses the db.Contact.findAll method to find a user with the same email as entered in the form,
 * then it passes the entered password and the hashed password of the user to the comparePassword function,
 * it also returns error with a status code 400 if any error happened
 * @param req
 * @param res
 */
exports.postLoginPage = (req, res) => {
    // Finds a user with the same email as entered in the form
    db.Contact.findAll({where: {mail: req.body.userName}})
        //compare entered password with hashed password of the user
        .then(user => {
            comparePassword(req.body.password, user[0].password, res, req);
        })
        // catch any errors
        .catch(() => {
            res.render('index', {
                title: 'Express',
                RegistrationSucceeded: false,
                wrongEntryDetails: true
            });
        });
};

/**
 * this function compares the plaintext password with the hashed password,
 * if they match it will log match otherwise no match,
 * it also catches any errors that might occur during the process of comparison.
 * @param plaintextPassword
 * @param hash
 * @param res
 * @param req
 * @returns {Promise<unknown>}
 */
function comparePassword(plaintextPassword, hash, res, req) {
    //compare plaintext password with hashed password
    bcrypt.compare(plaintextPassword, hash)
        // if matched, go to nasa website
        .then(result => {
            req.session.login = true;
            result ? res.redirect('/nasa/photos')
                : res.render('index', {
                    title: 'Express',
                    RegistrationSucceeded: false,
                    wrongEntryDetails: true
                });
        })
        // catch any errors
        .catch(err => {
            console.log(err)
        });
}