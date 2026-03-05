const { formatShortDate } = require('../../utils/date.util');

const BASE_NAV_ITEMS = [
    { href: '/home', label: 'Home' },
    { href: '/employees', label: 'Employee' },
    { href: '/teams', label: 'Team' },
    { href: '/projects', label: 'Project' },
    { href: '/reports', label: 'Report' },
];

const ADMIN_NAV_ITEMS = [
    { href: '/admin/accounts', label: 'Accounts Administration' },
    { href: '/admin/roles', label: 'Roles Administration' },
];

const isAdminUser = function isAdminUser(user) {
    return String(user?.roleName || '').toLowerCase() === 'admin';
};

const getNavItemsForUser = function getNavItemsForUser(user) {
    if (isAdminUser(user)) {
        return [...BASE_NAV_ITEMS, ...ADMIN_NAV_ITEMS];
    }

    return BASE_NAV_ITEMS;
};

/*
 * Shared render wrapper:
 * - sets global layout locals,
 * - keeps each controller focused on page-specific data only.
 */
const renderModule = function renderModule(res, view, data) {
    return res.render(view, {
        title: `Unitas | ${data.pageTitle}`,
        isAuthPage: false,
        navItems: getNavItemsForUser(res.locals.currentUser),
        todayLabel: formatShortDate(new Date()),
        ...data,
    });
};

const filterByQuery = function filterByQuery(collection, query, keys) {
    if (!query || !query.trim()) {
        return collection;
    }

    const normalized = query.toLowerCase();
    const filteredItems = [];

    for (const item of collection) {
        let hasMatch = false;

        for (const key of keys) {
            const value = String(item[key] || '').toLowerCase();

            if (value.includes(normalized)) {
                hasMatch = true;
                break;
            }
        }

        if (hasMatch) {
            filteredItems.push(item);
        }
    }

    return filteredItems;
};

module.exports = {
    renderModule,
    filterByQuery,
};
