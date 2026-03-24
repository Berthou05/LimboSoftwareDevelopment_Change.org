// middleware/navigationMiddleware.js
const buildNavigation = require('../utils/buildNavigation');

function navigationMiddleware(req, res, next) {
  const user = req.user || null;
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  res.locals.sidebarNavItems = buildNavigation(user, req.path);
  res.locals.layoutActiveRoute = req.path;
  res.locals.layoutCurrentUser = user || {
    name: 'Unitas User',
    roleName: 'Employee',
  };
  res.locals.layoutTodayLabel = todayLabel;
  res.locals.currentPath = req.path;

  next();
}

module.exports = navigationMiddleware;
