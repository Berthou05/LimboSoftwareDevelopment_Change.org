const { listEmployees, findEmployeeById } = require("./employees.service");
const { renderModule, filterByQuery } = require("../shared/view.util");
const { findSubjectOptions } = require("../shared/subject-options.service");
const { buildQuickReportContext } = require("../shared/page-context.util");

// Employee controller: list and detail pages for employee entities.
function renderEmployees(req, res) {
  const query = req.query.q || "";
  const employees = filterByQuery(listEmployees(), query, ["fullName", "title"]);

  return renderModule(res, "pages/employees", {
    activeRoute: "/employees",
    pageTitle: "Employee",
    pageSubtitle: "Intermediate selection for own profile, team members, and other employees.",
    employees,
    query,
  });
}

function renderEmployeeDetail(req, res) {
  const employee = findEmployeeById(req.params.id);
  if (!employee) {
    req.session.flash = { type: "danger", message: "Employee not found." };
    return res.redirect("/employees");
  }

  const detailed = listEmployees().find((candidate) => candidate.id === employee.id);
  const isOwnProfile = req.session.user.employeeId === employee.id;
  const { currentDateLabel, quickReport } = buildQuickReportContext("EMPLOYEE", detailed.id);

  return renderModule(res, "pages/employeeDetail", {
    activeRoute: "/employees",
    pageTitle: detailed.fullName,
    pageSubtitle: "Employee page with profile data, activity log, and report generation.",
    employee: detailed,
    isOwnProfile,
    reportSubjects: findSubjectOptions(),
    defaultReportType: "EMPLOYEE",
    defaultSubjectId: detailed.id,
    currentDateLabel,
    quickReport,
  });
}

module.exports = {
  renderEmployees,
  renderEmployeeDetail,
};

