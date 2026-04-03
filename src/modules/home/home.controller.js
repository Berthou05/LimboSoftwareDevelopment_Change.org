/*
Title: home.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getHome = (request, response, next) => {
    return response.render('pages/home',{
        csrfToken: request.csrfToken(),
        pageTitle: 'Home',
    });
};
