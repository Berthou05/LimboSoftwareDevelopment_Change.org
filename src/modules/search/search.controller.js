/*
Title: search.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getSearch = (request, response, next) => {
    response.render('pages/search',{
        csrfToken: request.csrfToken(),
    });
};