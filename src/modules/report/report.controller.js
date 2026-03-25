/*
Title: report.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getReport = (request, response, next) => {
    return response.render('pages/report',{
        csrfToken: request.csrfToken(),
    });
};
