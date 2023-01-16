//contain the Contact model, which is accessible via db.user
//const db = require('../models');
/**
 * this function takes a request and response object,
 * if user is login - renders 'nasa' view.
 * else - return user to login page
 * @param req
 * @param res
 */
exports.getNasaPage = (req, res) => {
    //render nasa view if user is longed-in. else, return user to login page
    req.session.login === true ? res.render('nasa', {title: 'Express'}) : res.redirect('/');
};

