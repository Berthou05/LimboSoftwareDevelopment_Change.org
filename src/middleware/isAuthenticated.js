// src/middleware/isAuthenticated.js
module.exports = function (req, res, next) {
  // Example: check if user is logged in via session
  if (req.session && req.session.user) {
    res.locals.isAuth = true;
    return next();
  }
  res.locals.isAuth = false;
  return res.redirect('/login');
};
