const { listTeams, setTeamMembership } = require('./teams.service');
const { renderModule, filterByQuery } = require('../shared/view.util');
const { findFilteredSubjectOptions } = require('../shared/subject-options.service');
const { buildQuickReportContext } = require('../shared/page-context.util');
const { groupActivitiesByDay } = require('../shared/activity-sections.util');
const { getLatestReportsByType } = require('../reports/reports.service');

const renderTeams = function renderTeams(req, res) {
    const query = req.query.q || '';
    const teams = filterByQuery(listTeams(), query, ['name', 'description']);

    return renderModule(res, 'pages/teams', {
        activeRoute: '/teams',
        pageTitle: 'Team',
        pageSubtitle: 'Intermediate selection for own and other teams.',
        teams,
        query,
    });
};

const renderTeamDetail = function renderTeamDetail(req, res) {
    const team = listTeams().find((candidate) => candidate.id === req.params.id);
    const currentUser = req.session.user;

    if (!team) {
        req.session.flash = {
            type: 'danger',
            message: 'Team not found.',
        };

        return res.redirect('/teams');
    }

    const isMember = team.members.some((member) => {
        return member.employeeId === req.session.user.employeeId;
    });

    const { currentDateLabel, quickReport } = buildQuickReportContext('TEAM', team.id);
    const activitySections = groupActivitiesByDay(team.activityLog);

    return renderModule(res, 'pages/teamDetail', {
        activeRoute: '/teams',
        pageTitle: team.name,
        pageSubtitle: 'Team page with information, participants, projects, and activity filters.',
        team,
        isMember,
        reportSubjects: findFilteredSubjectOptions(currentUser.employeeId, currentUser.roleName),
        defaultReportType: 'TEAM',
        defaultSubjectId: team.id,
        currentDateLabel,
        quickReport,
        activitySections,
        latestReports: getLatestReportsByType(),
    });
};

const handleTeamMembership = function handleTeamMembership(req, res) {
    setTeamMembership(req.params.id, req.session.user.employeeId);

    req.session.flash = {
        type: 'success',
        message: 'Team membership updated.',
    };

    return res.redirect(`/teams/${req.params.id}`);
};

module.exports = {
    renderTeams,
    renderTeamDetail,
    handleTeamMembership,
};
