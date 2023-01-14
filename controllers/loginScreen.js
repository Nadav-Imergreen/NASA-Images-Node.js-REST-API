//contain the Contact model, which is accessible via db.user
const db = require('../models');
const bcrypt = require("bcrypt");
/**
 * GET home page
 * @param req
 * @param res
 */
exports.getLoginPage = (req, res) => {
    //render the index view and provide a title, imgLogo, and RegistrationSucceeded to be used in the view
    res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: false});
};

exports.postLoginPage = (req, res) => {
    console.log('postLoginPage');
    const userName = req.body.userName;
    const password = req.body.password;

    db.Contact.findAll({where: {mail: userName}}).then(user => {
        comparePassword(password, user[0].password, res);
    })
        .catch((err) => {
            console.log('*** error finding user', JSON.stringify(err))
            return res.status(400).send(err)
        });
};

function comparePassword(plaintextPassword, hash) {
    return bcrypt.compare(plaintextPassword, hash)
        .then(result => {
            result ? console.log('match') : console.log('no match');
        })
        .catch(err => {
            console.log(err)
        });
}
