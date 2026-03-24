// middleware/navigationMiddleware.js
const buildNavigation = require('../utils/buildNavigation');

function navigationMiddleware(req, res, next) {
  const user = req.user || null;

  res.locals.sidebarNavItems = buildNavigation(user, req.path);
  console.log('sidebarNavItems:', res.locals.sidebarNavItems);
  res.locals.currentPath = req.path;

  next();
}

module.exports = navigationMiddleware;