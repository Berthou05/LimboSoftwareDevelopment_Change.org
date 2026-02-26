const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  renderHome,
  renderEmployees,
  renderEmployeeDetail,
  renderTeams,
  renderTeamDetail,
  handleTeamMembership,
  renderProjects,
  renderProjectDetail,
  handleProjectMembership,
  renderReports,
  handleGenerateReport,
  renderAccountsAdmin,
  handleAccountRole,
  handleAccountStatus,
  renderRolesAdmin,
  handleRolePrivilege,
  renderAccount,
  handleAccountSave,
} = require("../controllers/moduleController");

const router = express.Router();

router.use(requireAuth);

router.get("/home", renderHome);

router.get("/employees", renderEmployees);
router.get("/employees/:id", renderEmployeeDetail);

router.get("/teams", renderTeams);
router.get("/teams/:id", renderTeamDetail);
router.post("/teams/:id/toggle-membership", handleTeamMembership);

router.get("/projects", renderProjects);
router.get("/projects/:id", renderProjectDetail);
router.post("/projects/:id/toggle-membership", handleProjectMembership);

router.get("/reports", renderReports);
router.post("/reports/generate", handleGenerateReport);

router.get("/admin/accounts", renderAccountsAdmin);
router.post("/admin/accounts/:id/role", handleAccountRole);
router.post("/admin/accounts/:id/status", handleAccountStatus);

router.get("/admin/roles", renderRolesAdmin);
router.post("/admin/roles/:roleId/:privilegeCode/toggle", handleRolePrivilege);

router.get("/account", renderAccount);
router.post("/account", handleAccountSave);

module.exports = router;
