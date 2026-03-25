// src/middleware/isAuthenticated.js
module.exports = function (request, response, next) {
  if (request.session.isAuth) {
    response.locals.isAuth = true;
    return next();
  }
  else{
    response.locals.isAuth = false;
    return response.redirect('/');
  }
};
