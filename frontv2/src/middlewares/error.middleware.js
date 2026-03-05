/*
 * Error rendering helper so 404 and 500 responses share one template contract.
 */
const renderErrorPage = function renderErrorPage(res, statusCode, pageTitle, pageSubtitle) {
    return res.status(statusCode).render('pages/notFound', {
        title: `Unitas | ${pageTitle}`,
        isAuthPage: false,
        activeRoute: '',
        pageTitle,
        pageSubtitle,
    });
};

const notFoundHandler = function notFoundHandler(req, res) {
    return renderErrorPage(res, 404, '404', 'The requested page does not exist.');
};

const errorHandler = function errorHandler(err, req, res, next) {
    // eslint-disable-next-line no-console
    console.error(err);

    return renderErrorPage(res, 500, 'Error', 'An unexpected error occurred.');
};

module.exports = {
    notFoundHandler,
    errorHandler,
};
