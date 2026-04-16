const renderNotFound = function renderNotFound(request, response) {
    return response.status(404).render('pages/error404', {
        csrfToken: typeof request.csrfToken === 'function' ? request.csrfToken() : '',
        pageTitle: 'Page Not Found',
        pageSubtitle: 'The page you are looking for does not exist.',
        isNotFoundPage: true,
        isLoginPage: !request.session?.isLoggedIn,
        isLoggedIn: request.session?.isLoggedIn || false,
        username: request.session?.username || '',
    });
};

module.exports = renderNotFound;
