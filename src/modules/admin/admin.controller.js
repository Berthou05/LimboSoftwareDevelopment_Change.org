/*
Title: admin.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getAccounts = (request, response, next) => {
    response.render('pages/admin-accounts');
};

exports.getRoles = (request, response, next) => {
    response.render('pages/admin-roles');
};
