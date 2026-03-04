const { listProjects, setProjectMembership } = require("./projects.service");
const { renderModule, filterByQuery } = require("../shared/view.util");
const { findSubjectOptions } = require("../shared/subject-options.service");
const { buildQuickReportContext } = require("../shared/page-context.util");

// Project controller: list and detail pages for projects.
function renderProjects(req, res) {
  const query = req.query.q || "";
  const projects = filterByQuery(listProjects(), query, ["name", "description", "status"]);

  return renderModule(res, "pages/projects", {
    activeRoute: "/projects",
    pageTitle: "Project",
    pageSubtitle: "Intermediate selection for own and other projects.",
    projects,
    query,
  });
}

function renderProjectDetail(req, res) {
  const project = listProjects().find((candidate) => candidate.id === req.params.id);
  if (!project) {
    req.session.flash = { type: "danger", message: "Project not found." };
    return res.redirect("/projects");
  }

  const isParticipant = project.participants.some(
    (participant) => participant.id === req.session.user.employeeId
  );
  const { currentDateLabel, quickReport } = buildQuickReportContext("PROJECT", project.id);

  return renderModule(res, "pages/projectDetail", {
    activeRoute: "/projects",
    pageTitle: project.name,
    pageSubtitle: "Project page with goals, achievements, highlights, and participants.",
    project,
    isParticipant,
    reportSubjects: findSubjectOptions(),
    defaultReportType: "PROJECT",
    defaultSubjectId: project.id,
    currentDateLabel,
    quickReport,
  });
}

function handleProjectMembership(req, res) {
  setProjectMembership(req.params.id, req.session.user.employeeId);
  req.session.flash = {
    type: "success",
    message: "Project participation updated.",
  };
  return res.redirect(`/projects/${req.params.id}`);
}

module.exports = {
  renderProjects,
  renderProjectDetail,
  handleProjectMembership,
};

