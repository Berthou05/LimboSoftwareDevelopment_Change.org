module.exports = (request, response, next) => {
    if (!request.session.isAuth) {
        return response.redirect('/auth/login');
    }
    next();
}