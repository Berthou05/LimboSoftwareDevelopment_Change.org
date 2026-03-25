// utils/buildNavigation.js
const { BASE_NAV_ITEMS, ADMIN_NAV_ITEMS } = require('../config/navigation');


// This function checks if a navigation item should be marked as active based on the current path.
function isItemActive(currentPath, itemHref) {
  if (itemHref === '/') {
    return currentPath === '/';
  }

  return currentPath === itemHref || currentPath.startsWith(`${itemHref}/`);
}

// This function builds the navigation items for the user interface based on the user's role and the current path.
function buildNavigation(user, currentPath) {
  let items = [...BASE_NAV_ITEMS];

  if (user?.role === 'admin') {
    items = [...items, ...ADMIN_NAV_ITEMS];
  }

  return items.map((item) => ({
    ...item,
    isActive: isItemActive(currentPath, item.href),
  }));
}

module.exports = buildNavigation;
