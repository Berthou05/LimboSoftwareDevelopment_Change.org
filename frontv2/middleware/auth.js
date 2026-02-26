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

function requireAdmin(req, res, next) {
  const roleName = String(req.session.user?.roleName || "").toLowerCase();
  if (roleName !== "admin") {
    req.session.flash = {
      type: "danger",
      message: "Admin access required.",
    };
    return res.redirect("/home");
  }
  return next();
}

module.exports = {
  requireAuth,
  requireAdmin,
};
