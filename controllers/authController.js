exports.ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    return next();
  }
};

exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};
