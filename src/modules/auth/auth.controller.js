/*
Title: auth.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getAuth = (request, response, next) => {
    response.render('pages/login', { isAuth: false });
};
