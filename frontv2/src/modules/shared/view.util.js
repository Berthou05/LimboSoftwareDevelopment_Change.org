const { formatShortDate } = require("../../utils/date.util");

const baseNavItems = [
  { href: "/home", label: "Home" },
  { href: "/employees", label: "Employee" },
  { href: "/teams", label: "Team" },
  { href: "/projects", label: "Project" },
  { href: "/reports", label: "Report" },
];

const adminNavItems = [
  { href: "/admin/accounts", label: "Accounts Administration" },
  { href: "/admin/roles", label: "Roles Administration" },
];

// Role check is intentionally string-based because session stores role name, not role ID.
function isAdminUser(user) {
  return String(user?.roleName || "").toLowerCase() === "admin";
}

// Admin users see base navigation + admin entries; others only see base entries.
function getNavItemsForUser(user) {
  return isAdminUser(user) ? [...baseNavItems, ...adminNavItems] : baseNavItems;
}

function renderModule(res, view, data) {
  // Centralized render helper so controllers only provide page-specific data.
  // This keeps title/nav/today-label behavior consistent across modules.
  return res.render(view, {
    title: `Unitas | ${data.pageTitle}`,
    isAuthPage: false,
    navItems: getNavItemsForUser(res.locals.currentUser),
    todayLabel: formatShortDate(new Date()),
    ...data,
  });
}

// Generic in-memory search helper used by list pages.
// `keys` controls which fields are searchable for each module.
function filterByQuery(collection, query, keys) {
  if (!query || query.trim().length === 0) {
    return collection;
  }
  const normalized = query.toLowerCase();
  return collection.filter((item) =>
    keys.some((key) => String(item[key] || "").toLowerCase().includes(normalized))
  );
}

module.exports = {
  renderModule,
  filterByQuery,
};


