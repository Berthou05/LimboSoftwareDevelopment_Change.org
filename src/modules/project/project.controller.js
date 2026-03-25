/*
Title: project.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

exports.getProject = (request, response, next) => {
    response.render('pages/project',{
        csrfToken: request.csrfToken(),
    });
};
