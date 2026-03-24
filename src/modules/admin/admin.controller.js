/*
Title: account.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getAdmin = (request, response, next) => {
    response.render('pages/admin');
};

exports.getRoles = (request, response, next) => {
    response.render('pages/admin-roles');
}