const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'You must be logged in  :C');
    res.redirect('/users/signin');
};

module.exports = helpers;