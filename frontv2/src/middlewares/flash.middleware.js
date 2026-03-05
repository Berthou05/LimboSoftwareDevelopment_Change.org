/*
 * Makes session-backed values available to all templates on every request.
 */
const flashMiddleware = function flashMiddleware(req, res, next) {
    res.locals.currentUser = req.session.user || null;
    res.locals.flash = req.session.flash || null;

    // Flash messages are one-time messages, so clear after exposing them.
    req.session.flash = null;

    return next();
};

module.exports = flashMiddleware;
