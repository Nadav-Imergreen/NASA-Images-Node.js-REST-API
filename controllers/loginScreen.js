//contain the Contact model, which is accessible via db.user
const db = require('../models');
const bcrypt = require("bcrypt");
/**
 * GET home page
 * @param req
 * @param res
 */
exports.getLoginPage =(req, res) => {
    //render the index view and provide a title, imgLogo, and RegistrationSucceeded to be used in the view
    res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: false});
};

exports.postLoginPage =(req, res) => {
// const userName = req.body.userName;
// const password = req.body.password;
// return db.content.findOne({ userName })
//     .then((user) => res.send(user))
//     .catch((err) => {
//         console.log('*** error creating a user', JSON.stringify(err))
//         return res.status(400).send(err)
//     })
};

function comparePassword(plaintextPassword, hash) {
    bcrypt.compare(plaintextPassword, hash)
        .then(result => {
            return result
        })
        .catch(err => {
            console.log(err)
        })
}


