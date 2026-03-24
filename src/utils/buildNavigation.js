// utils/buildNavigation.js
const { BASE_NAV_ITEMS, ADMIN_NAV_ITEMS } = require('../config/navigation');

function isItemActive(currentPath, itemHref) {
  if (itemHref === '/home') {
    return currentPath === '/home';
  }

  return currentPath === itemHref || currentPath.startsWith(`${itemHref}/`);
}

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