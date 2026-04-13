// middleware/navigationMiddleware.js
const buildNavigation = require('../utils/buildNavigation.util');
const { formatShortDate } = require('../utils/date.util');

function navigationMiddleware(req, res, next) {
  const sessionUser = req.session?.user || null;
  const privilegeMap = sessionUser?.privilege || {};
  const isAdmin = Boolean(privilegeMap['ADMIN-01']);
  const user = sessionUser
    ? {
      id: sessionUser.id || null,
      name: sessionUser.username || 'Unitas User',
      image: sessionUser.image || '',
      role: isAdmin ? 'admin' : 'employee',
      roleName: isAdmin ? 'Admin' : 'Employee',
    }
    : null;
  const todayLabel = formatShortDate(new Date());

  res.locals.sidebarNavItems = buildNavigation(user, req.path);
  res.locals.layoutActiveRoute = req.path;
  res.locals.layoutCurrentUser = user || {
    name: 'Unitas User',
    image: '',
    roleName: 'Employee',
  };
  res.locals.layoutTodayLabel = todayLabel;
  res.locals.currentPath = req.path;

  next();
}

module.exports = navigationMiddleware;
