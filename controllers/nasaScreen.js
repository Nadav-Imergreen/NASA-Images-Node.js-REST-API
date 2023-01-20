//contain the Contact model, which is accessible via db.user
const db = require('../models');
/**
 * this function takes a request and response object,
 * if user is login - renders 'nasa' view.
 * else - return user to login page
 * @param req
 * @param res
 */
exports.getNasaPage = (req, res) => {
    //render nasa view if user is longed-in. else, return user to login page
    if (req.session.login)
    db.Contact.findOne({where: {mail: req.session.email}
    }).then(user => res.render('nasa', {name: user.firstName})
    ).catch();
    else
        res.redirect('/');
    //req.session.login? res.render('nasa', {firstName: req.session.firstName}) : res.redirect('/');
};

exports.leaveNasaPage = (req, res) => {
    req.session.login = false;
    res.redirect('/');
};
