const {
  privilegesCatalog,
  getEmployees,
  getEmployeeById,
  getTeams,
  getProjects,
  getRoles,
  getReports,
  getAccounts,
  getHomeData,
  generateReport,
  updateAccountRole,
  updateAccountStatus,
  toggleRolePrivilege,
  toggleTeamMembership,
  toggleProjectMembership,
  getAccountById,
  updateOwnAccount,
} = require("../data/mockData");

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/employees", label: "Employee" },
  { href: "/teams", label: "Team" },
  { href: "/projects", label: "Project" },
  { href: "/reports", label: "Report" },
  { href: "/admin/accounts", label: "Accounts Administration" },
  { href: "/admin/roles", label: "Roles Administration" },
  { href: "/account", label: "Account" },
];

function renderModule(res, view, data) {
  return res.render(view, {
    title: `Unitas | ${data.pageTitle}`,
    isAuthPage: false,
    navItems,
    todayLabel: new Date().toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    ...data,
  });
}

function findSubjectOptions() {
  const employees = getEmployees().map((employee) => ({
    id: employee.id,
    label: employee.fullName,
    type: "EMPLOYEE",
  }));
  const teams = getTeams().map((team) => ({
    id: team.id,
    label: team.name,
    type: "TEAM",
  }));
  const projects = getProjects().map((project) => ({
    id: project.id,
    label: project.name,
    type: "PROJECT",
  }));
  return { employees, teams, projects };
}

function filterByQuery(collection, query, keys) {
  if (!query || query.trim().length === 0) {
    return collection;
  }
  const normalized = query.toLowerCase();
  return collection.filter((item) =>
    keys.some((key) => String(item[key] || "").toLowerCase().includes(normalized))
  );
}

function renderHome(req, res) {
  const homeData = getHomeData(req.session.user.employeeId);

  return renderModule(res, "pages/home", {
    activeRoute: "/home",
    pageTitle: "Home",
    pageSubtitle: "Latest activity, team activity, and project highlights.",
    ...homeData,
  });
}

function renderEmployees(req, res) {
  const query = req.query.q || "";
  const employees = filterByQuery(getEmployees(), query, ["fullName", "title"]);

  return renderModule(res, "pages/employees", {
    activeRoute: "/employees",
    pageTitle: "Employee",
    pageSubtitle: "Intermediate selection for own profile, team members, and other employees.",
    employees,
    query,
  });
}

function renderEmployeeDetail(req, res) {
  const employee = getEmployeeById(req.params.id);
  if (!employee) {
    req.session.flash = { type: "danger", message: "Employee not found." };
    return res.redirect("/employees");
  }

  const detailed = getEmployees().find((candidate) => candidate.id === employee.id);
  const isOwnProfile = req.session.user.employeeId === employee.id;

  return renderModule(res, "pages/employeeDetail", {
    activeRoute: "/employees",
    pageTitle: detailed.fullName,
    pageSubtitle: "Employee page with profile data, activity log, and report generation.",
    employee: detailed,
    isOwnProfile,
    reportSubjects: findSubjectOptions(),
    defaultReportType: "EMPLOYEE",
    defaultSubjectId: detailed.id,
  });
}

function renderTeams(req, res) {
  const query = req.query.q || "";
  const teams = filterByQuery(getTeams(), query, ["name", "description"]);

  return renderModule(res, "pages/teams", {
    activeRoute: "/teams",
    pageTitle: "Team",
    pageSubtitle: "Intermediate selection for own and other teams.",
    teams,
    query,
  });
}

function renderTeamDetail(req, res) {
  const team = getTeams().find((candidate) => candidate.id === req.params.id);
  if (!team) {
    req.session.flash = { type: "danger", message: "Team not found." };
    return res.redirect("/teams");
  }

  const isMember = team.members.some((member) => member.employeeId === req.session.user.employeeId);

  return renderModule(res, "pages/teamDetail", {
    activeRoute: "/teams",
    pageTitle: team.name,
    pageSubtitle: "Team page with information, participants, projects, and activity filters.",
    team,
    isMember,
    reportSubjects: findSubjectOptions(),
    defaultReportType: "TEAM",
    defaultSubjectId: team.id,
  });
}

function handleTeamMembership(req, res) {
  toggleTeamMembership(req.params.id, req.session.user.employeeId);
  req.session.flash = {
    type: "success",
    message: "Team membership updated.",
  };
  return res.redirect(`/teams/${req.params.id}`);
}

function renderProjects(req, res) {
  const query = req.query.q || "";
  const projects = filterByQuery(getProjects(), query, ["name", "description", "status"]);

  return renderModule(res, "pages/projects", {
    activeRoute: "/projects",
    pageTitle: "Project",
    pageSubtitle: "Intermediate selection for own and other projects.",
    projects,
    query,
  });
}

function renderProjectDetail(req, res) {
  const project = getProjects().find((candidate) => candidate.id === req.params.id);
  if (!project) {
    req.session.flash = { type: "danger", message: "Project not found." };
    return res.redirect("/projects");
  }

  const isParticipant = project.participants.some(
    (participant) => participant.id === req.session.user.employeeId
  );

  return renderModule(res, "pages/projectDetail", {
    activeRoute: "/projects",
    pageTitle: project.name,
    pageSubtitle: "Project page with goals, achievements, highlights, and participants.",
    project,
    isParticipant,
    reportSubjects: findSubjectOptions(),
    defaultReportType: "PROJECT",
    defaultSubjectId: project.id,
  });
}

function handleProjectMembership(req, res) {
  toggleProjectMembership(req.params.id, req.session.user.employeeId);
  req.session.flash = {
    type: "success",
    message: "Project participation updated.",
  };
  return res.redirect(`/projects/${req.params.id}`);
}

function renderReports(req, res) {
  return renderModule(res, "pages/reports", {
    activeRoute: "/reports",
    pageTitle: "Reports",
    pageSubtitle: "Report search, generation, and download simulation.",
    reportSubjects: findSubjectOptions(),
    reports: getReports(),
    defaultReportType: "PROJECT",
    defaultSubjectId: "",
  });
}

function hasValidDateRange(periodStart, periodEnd) {
  if (!periodStart || !periodEnd) {
    return false;
  }
  return new Date(periodStart).getTime() <= new Date(periodEnd).getTime();
}

function handleGenerateReport(req, res) {
  const { contentType, subjectId, periodStart, periodEnd, redirectTo } = req.body;
  if (!hasValidDateRange(periodStart, periodEnd)) {
    req.session.flash = {
      type: "danger",
      message: "Invalid report date range. Ensure start date is not after end date.",
    };
    return res.redirect(redirectTo || "/reports");
  }

  generateReport({
    contentType,
    subjectId,
    periodStart,
    periodEnd,
    requestedBy: req.session.user.employeeId,
  });

  req.session.flash = {
    type: "success",
    message: "Report generated and added to the reports list.",
  };
  return res.redirect(redirectTo || "/reports");
}

function renderAccountsAdmin(req, res) {
  return renderModule(res, "pages/accountsAdmin", {
    activeRoute: "/admin/accounts",
    pageTitle: "Accounts Administration",
    pageSubtitle: "Create accounts and assign roles or statuses.",
    accounts: getAccounts(),
    roles: getRoles(),
  });
}

function handleAccountRole(req, res) {
  updateAccountRole(req.params.id, req.body.roleId);
  req.session.flash = {
    type: "success",
    message: "Account role updated.",
  };
  return res.redirect("/admin/accounts");
}

function handleAccountStatus(req, res) {
  updateAccountStatus(req.params.id, req.body.status);
  req.session.flash = {
    type: "success",
    message: "Account status updated.",
  };
  return res.redirect("/admin/accounts");
}

function renderRolesAdmin(req, res) {
  return renderModule(res, "pages/rolesAdmin", {
    activeRoute: "/admin/roles",
    pageTitle: "Roles Administration",
    pageSubtitle: "Toggle privileges assigned to each role.",
    roles: getRoles(),
    privilegesCatalog,
  });
}

function handleRolePrivilege(req, res) {
  toggleRolePrivilege(req.params.roleId, req.params.privilegeCode);
  req.session.flash = {
    type: "success",
    message: "Role privileges updated.",
  };
  return res.redirect("/admin/roles");
}

function renderAccount(req, res) {
  const account = getAccountById(req.session.user.accountId);
  return renderModule(res, "pages/account", {
    activeRoute: "/account",
    pageTitle: "Account",
    pageSubtitle: "Modify account information and save changes.",
    account,
  });
}

function handleAccountSave(req, res) {
  updateOwnAccount(req.session.user.accountId, req.body);
  req.session.flash = {
    type: "success",
    message: "Account information updated.",
  };
  return res.redirect("/account");
}

module.exports = {
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
};
