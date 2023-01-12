/**
 * GET home page
 */
exports.getLoginPage =(req, res) => {
    //render the index view and provide a title, imgLogo, and RegistrationSucceeded to be used in the view
    res.render('index', {title: 'Express', imgLogo: '/images/0.png', RegistrationSucceeded: false});
};
