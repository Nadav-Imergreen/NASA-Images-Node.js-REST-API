//contain the Contact model, which is accessible via db.user
const db = require('../models');
const bcrypt = require("bcrypt");
/**
 * this function takes a request and response object, it renders an 'index' view.
 * @param req
 * @param res
 */
exports.getLoginPage = (req, res) => {
    // redirect to nasa page, but if user is not connected - go to login page
    if (req.session.login)
        res.redirect('/nasa/photos');
    else
    res.render('index', {
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
    db.Contact.findOne({where: {mail: req.body.userName.toLowerCase()}})
        //compare entered password with hashed password of the user
        .then(user => {
            // compares plaintext password with the hashed password
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.login = true;
                req.session.email = req.body.userName;
                res.redirect('/nasa/photos');
            } else
                res.render('index', {
                    RegistrationSucceeded: false,
                    wrongEntryDetails: true
                });
        })
        // catch any errors
        .catch(() => {
            res.render('index', {
                RegistrationSucceeded: false,
                wrongEntryDetails: true
            });
        });
};