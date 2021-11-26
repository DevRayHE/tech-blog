const withAuth = (req, res, next) => {
  // If usernot logged in redirect to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;