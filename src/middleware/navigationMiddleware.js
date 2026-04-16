// middleware/navigationMiddleware.js
const buildNavigation = require('../utils/buildNavigation.util');
const { formatShortDate } = require('../utils/date.util');

const DEFAULT_AVATAR = '/images/accounts/2026-04-13T18-43-46.235Z-avatar.png';

const isPlaceholderImage = (image) => {
  if (!image || typeof image !== 'string') return true;
  return image.includes('ui-avatars.com') || image.includes('dicebear');
};

function navigationMiddleware(req, res, next) {
  const sessionUser = req.session?.user || null;
  const privilegeMap = sessionUser?.privilege || {};
  const isAdmin = Boolean(privilegeMap['ADMIN-01']);
  
  const userImage = sessionUser?.image && !isPlaceholderImage(sessionUser.image) 
    ? sessionUser.image 
    : DEFAULT_AVATAR;
  
  const user = sessionUser
    ? {
      id: sessionUser.id || null,
      name: sessionUser.username || 'Unitas User',
      image: userImage,
      role: isAdmin ? 'admin' : 'employee',
      roleName: isAdmin ? 'Admin' : 'Employee',
    }
    : null;
  const todayLabel = formatShortDate(new Date());

  res.locals.sidebarNavItems = buildNavigation(user, req.path);
  res.locals.layoutActiveRoute = req.path;
  res.locals.layoutCurrentUser = user || {
    name: 'Unitas User',
    image: DEFAULT_AVATAR,
    roleName: 'Employee',
  };
  res.locals.layoutTodayLabel = todayLabel;
  res.locals.currentPath = req.path;

  next();
}

module.exports = navigationMiddleware;
