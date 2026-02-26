function requireAuth(req, res, next) {
  if (!req.session.user) {
    req.session.flash = {
      type: "warning",
      message: "Please sign in to continue.",
    };
    return res.redirect("/login");
  }
  return next();
}

module.exports = {
  requireAuth,
};
