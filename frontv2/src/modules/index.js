// Central place to register feature routers.
// New teammates only need to add a router here + mount path inside that router file.
const authRoutes = require("./auth/auth.routes");
const homeRoutes = require("./home/home.routes");
const employeesRoutes = require("./employees/employees.routes");
const teamsRoutes = require("./teams/teams.routes");
const projectsRoutes = require("./projects/projects.routes");
const reportsRoutes = require("./reports/reports.routes");
const adminRoutes = require("./admin/admin.routes");
const accountRoutes = require("./account/account.routes");

module.exports = [
  authRoutes,
  homeRoutes,
  employeesRoutes,
  teamsRoutes,
  projectsRoutes,
  reportsRoutes,
  adminRoutes,
  accountRoutes,
];
