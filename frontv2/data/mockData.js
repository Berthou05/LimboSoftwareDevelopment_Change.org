const privilegesCatalog = [
  { code: "AUTH-01", name: "Sign in" },
  { code: "HS-01", name: "Search home entities" },
  { code: "AL-04", name: "Consult activity log" },
  { code: "REP-01", name: "Generate reports" },
  { code: "TEAM-04", name: "Consult team information" },
  { code: "PROJ-04", name: "Consult project information" },
  { code: "ADMIN-05", name: "Assign roles to accounts" },
  { code: "ADMIN-03", name: "Assign privileges to roles" },
];

const roles = [
  {
    id: "role-user",
    name: "Employee",
    privilegeCodes: ["AUTH-01", "HS-01", "AL-04", "TEAM-04", "PROJ-04", "REP-01"],
  },
  {
    id: "role-lead",
    name: "Lead",
    privilegeCodes: [
      "AUTH-01",
      "HS-01",
      "AL-04",
      "TEAM-04",
      "PROJ-04",
      "REP-01",
      "ADMIN-05",
    ],
  },
  {
    id: "role-admin",
    name: "Admin",
    privilegeCodes: privilegesCatalog.map((p) => p.code),
  },
];

const employees = [
  {
    id: "emp-1",
    fullName: "Rodrigo Hurtado",
    timezone: "America/Mexico_City",
    title: "Software Engineer",
    bio: "Builds reporting workflows and keeps team delivery healthy.",
    teams: ["team-1"],
    projects: ["proj-1", "proj-2"],
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rodrigo",
  },
  {
    id: "emp-2",
    fullName: "Ana Cuevas",
    timezone: "America/Mexico_City",
    title: "Frontend Lead",
    bio: "Owns UI consistency and accessibility across modules.",
    teams: ["team-1"],
    projects: ["proj-1"],
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ana",
  },
  {
    id: "emp-3",
    fullName: "Alexis Berthou",
    timezone: "America/Mexico_City",
    title: "Data Engineer",
    bio: "Designs data pipelines for report generation.",
    teams: ["team-2"],
    projects: ["proj-2"],
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexis",
  },
  {
    id: "emp-4",
    fullName: "Alejandro Contreras",
    timezone: "America/Mexico_City",
    title: "Product Engineer",
    bio: "Connects employee workflows and business goals.",
    teams: ["team-2"],
    projects: ["proj-2"],
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alejandro",
  },
];

const teams = [
  {
    id: "team-1",
    name: "Team Penguin",
    description: "Maintains core modules and authentication workflows.",
    image: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Penguin&backgroundType=solid&backgroundColor=dbeafe",
    responsibleEmployeeId: "emp-2",
    members: [
      { employeeId: "emp-1", role: "Employee", startDate: "2025-08-12" },
      { employeeId: "emp-2", role: "Lead", startDate: "2025-06-01" },
    ],
    projectIds: ["proj-1"],
  },
  {
    id: "team-2",
    name: "Team Seal",
    description: "Creates analytics, summaries, and operational dashboards.",
    image: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Seal&backgroundType=solid&backgroundColor=d1fae5",
    responsibleEmployeeId: "emp-3",
    members: [
      { employeeId: "emp-3", role: "Lead", startDate: "2025-07-10" },
      { employeeId: "emp-4", role: "Employee", startDate: "2025-07-12" },
    ],
    projectIds: ["proj-2"],
  },
];

const projects = [
  {
    id: "proj-1",
    name: "Unitas Core Web",
    description: "Main workspace for daily entries, activity logs, and reporting.",
    status: "ACTIVE",
    startDate: "2025-11-01",
    endDate: "2026-06-30",
    responsibleEmployeeId: "emp-2",
    teamIds: ["team-1"],
    participantIds: ["emp-1", "emp-2"],
    goals: [
      {
        id: "goal-1",
        title: "Stabilize authentication module",
        description: "Complete login, recover, and reset user flows.",
        dueDate: "2026-03-15",
        status: "IN_PROGRESS",
      },
    ],
    achievements: [
      {
        id: "ach-1",
        title: "Role-based navigation",
        description: "Sidebar now adapts to role permissions.",
        achievementDate: "2026-02-10",
        evidenceLink: "#",
      },
    ],
    highlights: [
      {
        id: "hl-1",
        title: "Sprint 7 quality uplift",
        content: "Reduced UI bugs in reports by 32%.",
        createdAt: "2026-02-18",
      },
    ],
  },
  {
    id: "proj-2",
    name: "AI Report Pipeline",
    description: "Builds AI-generated summaries and PDF export automation.",
    status: "ACTIVE",
    startDate: "2025-10-15",
    endDate: "2026-08-01",
    responsibleEmployeeId: "emp-3",
    teamIds: ["team-2"],
    participantIds: ["emp-1", "emp-3", "emp-4"],
    goals: [
      {
        id: "goal-2",
        title: "Prompt routing by report type",
        description: "Select prompts by Employee, Team, and Project content.",
        dueDate: "2026-04-01",
        status: "IN_PROGRESS",
      },
    ],
    achievements: [
      {
        id: "ach-2",
        title: "Daily snapshots ready",
        description: "Report snapshots now include filters_json metadata.",
        achievementDate: "2026-02-12",
        evidenceLink: "#",
      },
    ],
    highlights: [
      {
        id: "hl-2",
        title: "Slack report command tested",
        content: "Internal test validates report generation from Slack trigger.",
        createdAt: "2026-02-20",
      },
    ],
  },
];

const activities = [
  {
    id: "act-1",
    employeeId: "emp-1",
    teamId: "team-1",
    projectId: "proj-1",
    title: "Updated report filters",
    description: "Added validation for start_date <= end_date.",
    completedAt: "2026-02-24T16:20:00.000Z",
  },
  {
    id: "act-2",
    employeeId: "emp-2",
    teamId: "team-1",
    projectId: "proj-1",
    title: "Reviewed account settings",
    description: "Prepared editable account profile fields.",
    completedAt: "2026-02-24T18:10:00.000Z",
  },
  {
    id: "act-3",
    employeeId: "emp-3",
    teamId: "team-2",
    projectId: "proj-2",
    title: "Integrated report prompt table",
    description: "Linked prompt templates to content type.",
    completedAt: "2026-02-25T15:00:00.000Z",
  },
  {
    id: "act-4",
    employeeId: "emp-4",
    teamId: "team-2",
    projectId: "proj-2",
    title: "Published highlight card",
    description: "Shared current sprint highlight in project module.",
    completedAt: "2026-02-25T17:20:00.000Z",
  },
];

const reports = [
  {
    id: "rep-1",
    contentType: "PROJECT",
    subjectId: "proj-1",
    subjectLabel: "Unitas Core Web",
    periodStart: "2026-02-01",
    periodEnd: "2026-02-21",
    createdAt: "2026-02-21T19:00:00.000Z",
    requestedBy: "emp-1",
    fileUrl: "#",
  },
];

const accounts = [
  {
    id: "acc-1",
    employeeId: "emp-1",
    email: "rodrigo@unitas.dev",
    password: "123456",
    slackUsername: "@rodrigo",
    status: "ACTIVE",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rodrigo",
    roleId: "role-admin",
  },
  {
    id: "acc-2",
    employeeId: "emp-2",
    email: "ana@unitas.dev",
    password: "123456",
    slackUsername: "@ana",
    status: "ACTIVE",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ana",
    roleId: "role-lead",
  },
  {
    id: "acc-3",
    employeeId: "emp-3",
    email: "alexis@unitas.dev",
    password: "123456",
    slackUsername: "@alexis",
    status: "ACTIVE",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexis",
    roleId: "role-user",
  },
];

function sortByDateDesc(a, b, field) {
  return new Date(b[field]).getTime() - new Date(a[field]).getTime();
}

function getRoleById(roleId) {
  return roles.find((role) => role.id === roleId) || null;
}

function getEmployeeById(employeeId) {
  return employees.find((employee) => employee.id === employeeId) || null;
}

function getTeamById(teamId) {
  return teams.find((team) => team.id === teamId) || null;
}

function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId) || null;
}

function getAccountById(accountId) {
  return accounts.find((account) => account.id === accountId) || null;
}

function getAccountByIdentity(identity) {
  return (
    accounts.find(
      (account) =>
        account.email.toLowerCase() === identity.toLowerCase() ||
        account.slackUsername.toLowerCase() === identity.toLowerCase()
    ) || null
  );
}

function authenticate(identity, password) {
  const account = getAccountByIdentity(identity);
  if (!account || account.password !== password) {
    return null;
  }

  const employee = getEmployeeById(account.employeeId);
  const role = getRoleById(account.roleId);
  return {
    accountId: account.id,
    employeeId: employee?.id,
    name: employee?.fullName || account.email,
    roleName: role?.name || "Employee",
  };
}

function buildEmployeeContext(employee) {
  return {
    ...employee,
    teamObjects: employee.teams.map(getTeamById).filter(Boolean),
    projectObjects: employee.projects.map(getProjectById).filter(Boolean),
    activityLog: activities
      .filter((activity) => activity.employeeId === employee.id)
      .sort((a, b) => sortByDateDesc(a, b, "completedAt")),
  };
}

function getHomeData(employeeId) {
  const employee = getEmployeeById(employeeId);
  if (!employee) {
    return null;
  }

  const personalActivities = activities
    .filter((activity) => activity.employeeId === employeeId)
    .sort((a, b) => sortByDateDesc(a, b, "completedAt"));

  const teamActivities = activities
    .filter((activity) => employee.teams.includes(activity.teamId))
    .sort((a, b) => sortByDateDesc(a, b, "completedAt"));

  const projectPanels = employee.projects.map((projectId) => getProjectById(projectId)).filter(Boolean);

  return {
    employee: buildEmployeeContext(employee),
    latestActivity: personalActivities.slice(0, 5),
    teamActivity: teamActivities.slice(0, 8),
    projectPanels,
  };
}

function getEmployees() {
  return employees.map(buildEmployeeContext);
}

function getTeams() {
  return teams.map((team) => ({
    ...team,
    lead: getEmployeeById(team.responsibleEmployeeId),
    membersDetailed: team.members.map((member) => ({
      ...member,
      employee: getEmployeeById(member.employeeId),
    })),
    projectsDetailed: team.projectIds.map(getProjectById).filter(Boolean),
    activityLog: activities
      .filter((activity) => activity.teamId === team.id)
      .sort((a, b) => sortByDateDesc(a, b, "completedAt")),
  }));
}

function getProjects() {
  return projects.map((project) => ({
    ...project,
    responsible: getEmployeeById(project.responsibleEmployeeId),
    participants: project.participantIds.map(getEmployeeById).filter(Boolean),
    teamsDetailed: project.teamIds.map(getTeamById).filter(Boolean),
    activityLog: activities
      .filter((activity) => activity.projectId === project.id)
      .sort((a, b) => sortByDateDesc(a, b, "completedAt")),
  }));
}

function generateReport({ contentType, subjectId, periodStart, periodEnd, requestedBy }) {
  const subjectMap = {
    EMPLOYEE: getEmployeeById(subjectId)?.fullName,
    TEAM: getTeamById(subjectId)?.name,
    PROJECT: getProjectById(subjectId)?.name,
  };

  const report = {
    id: `rep-${reports.length + 1}`,
    contentType,
    subjectId,
    subjectLabel: subjectMap[contentType] || "Unknown",
    periodStart,
    periodEnd,
    createdAt: new Date().toISOString(),
    requestedBy,
    fileUrl: "#",
  };
  reports.unshift(report);
  return report;
}

function getReports() {
  return [...reports].sort((a, b) => sortByDateDesc(a, b, "createdAt"));
}

function getAccounts() {
  return accounts.map((account) => ({
    ...account,
    role: getRoleById(account.roleId),
    employee: getEmployeeById(account.employeeId),
  }));
}

function updateAccountRole(accountId, roleId) {
  const account = getAccountById(accountId);
  if (!account) {
    return false;
  }
  account.roleId = roleId;
  return true;
}

function updateAccountStatus(accountId, status) {
  const account = getAccountById(accountId);
  if (!account) {
    return false;
  }
  account.status = status;
  return true;
}

function toggleRolePrivilege(roleId, privilegeCode) {
  const role = getRoleById(roleId);
  if (!role) {
    return false;
  }
  if (role.privilegeCodes.includes(privilegeCode)) {
    role.privilegeCodes = role.privilegeCodes.filter((code) => code !== privilegeCode);
  } else {
    role.privilegeCodes.push(privilegeCode);
  }
  return true;
}

function toggleTeamMembership(teamId, employeeId) {
  const team = getTeamById(teamId);
  const employee = getEmployeeById(employeeId);
  if (!team || !employee) {
    return false;
  }

  const memberIndex = team.members.findIndex((member) => member.employeeId === employeeId);
  if (memberIndex >= 0) {
    team.members.splice(memberIndex, 1);
    employee.teams = employee.teams.filter((id) => id !== teamId);
  } else {
    team.members.push({
      employeeId,
      role: "Employee",
      startDate: new Date().toISOString().slice(0, 10),
    });
    employee.teams.push(teamId);
  }
  return true;
}

function toggleProjectMembership(projectId, employeeId) {
  const project = getProjectById(projectId);
  const employee = getEmployeeById(employeeId);
  if (!project || !employee) {
    return false;
  }

  if (project.participantIds.includes(employeeId)) {
    project.participantIds = project.participantIds.filter((id) => id !== employeeId);
    employee.projects = employee.projects.filter((id) => id !== projectId);
  } else {
    project.participantIds.push(employeeId);
    employee.projects.push(projectId);
  }
  return true;
}

function getRoles() {
  return roles.map((role) => ({
    ...role,
    privileges: role.privilegeCodes.map((code) => privilegesCatalog.find((p) => p.code === code)),
  }));
}

function updateOwnAccount(accountId, payload) {
  const account = getAccountById(accountId);
  if (!account) {
    return false;
  }

  account.email = payload.email || account.email;
  account.slackUsername = payload.slackUsername || account.slackUsername;
  if (payload.password && payload.password.trim().length > 0) {
    account.password = payload.password;
  }
  account.image = payload.image || account.image;
  return true;
}

module.exports = {
  privilegesCatalog,
  getEmployees,
  getEmployeeById,
  getTeams,
  getTeamById,
  getProjects,
  getProjectById,
  getRoles,
  getReports,
  getAccounts,
  authenticate,
  getHomeData,
  generateReport,
  updateAccountRole,
  updateAccountStatus,
  toggleRolePrivilege,
  toggleTeamMembership,
  toggleProjectMembership,
  getAccountById,
  getRoleById,
  updateOwnAccount,
};
