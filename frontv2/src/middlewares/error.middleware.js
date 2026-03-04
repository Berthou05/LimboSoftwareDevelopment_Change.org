function renderErrorPage(res, statusCode, pageTitle, pageSubtitle) {
  return res.status(statusCode).render("pages/notFound", {
    title: `Unitas | ${pageTitle}`,
    isAuthPage: false,
    activeRoute: "",
    pageTitle,
    pageSubtitle,
  });
}

function notFoundHandler(req, res) {
  return renderErrorPage(res, 404, "404", "The requested page does not exist.");
}

function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  return renderErrorPage(res, 500, "Error", "An unexpected error occurred.");
}

module.exports = {
  notFoundHandler,
  errorHandler,
};

