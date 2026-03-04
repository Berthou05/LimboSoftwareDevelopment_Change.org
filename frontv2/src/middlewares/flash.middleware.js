function flashMiddleware(req, res, next) {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  req.session.flash = null;
  next();
}

module.exports = flashMiddleware;
