/**
 * handle 404 errors
 * @param req
 * @param res
 */
exports.get404 = (req, res) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path : '' });
};

exports.get400 = (req, res) => {
    res.status(400).render('400', { pageTitle: 'error', path : '' });
};
