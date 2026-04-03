/*
Title: account.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getAccount = (request, response, next) => {
    return response.render('pages/account',{
        csrfToken: request.csrfToken(),
        pageTitle: 'Account',
    });
};
