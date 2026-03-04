const { listTeams, setTeamMembership } = require("./teams.service");
const { renderModule, filterByQuery } = require("../shared/view.util");
const { findSubjectOptions } = require("../shared/subject-options.service");
const { buildQuickReportContext } = require("../shared/page-context.util");

// Team controller: list and detail pages for teams.
function renderTeams(req, res) {
  const query = req.query.q || "";
  const teams = filterByQuery(listTeams(), query, ["name", "description"]);

  return renderModule(res, "pages/teams", {
    activeRoute: "/teams",
    pageTitle: "Team",
    pageSubtitle: "Intermediate selection for own and other teams.",
    teams,
    query,
  });
}

function renderTeamDetail(req, res) {
  const team = listTeams().find((candidate) => candidate.id === req.params.id);
  if (!team) {
    req.session.flash = { type: "danger", message: "Team not found." };
    return res.redirect("/teams");
  }

  const isMember = team.members.some((member) => member.employeeId === req.session.user.employeeId);
  const { currentDateLabel, quickReport } = buildQuickReportContext("TEAM", team.id);

  return renderModule(res, "pages/teamDetail", {
    activeRoute: "/teams",
    pageTitle: team.name,
    pageSubtitle: "Team page with information, participants, projects, and activity filters.",
    team,
    isMember,
    reportSubjects: findSubjectOptions(),
    defaultReportType: "TEAM",
    defaultSubjectId: team.id,
    currentDateLabel,
    quickReport,
  });
}

function handleTeamMembership(req, res) {
  setTeamMembership(req.params.id, req.session.user.employeeId);
  req.session.flash = {
    type: "success",
    message: "Team membership updated.",
  };
  return res.redirect(`/teams/${req.params.id}`);
}

module.exports = {
  renderTeams,
  renderTeamDetail,
  handleTeamMembership,
};

