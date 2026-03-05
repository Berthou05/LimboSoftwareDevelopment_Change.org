const { listProjects, setProjectMembership } = require('./projects.service');
const { renderModule, filterByQuery } = require('../shared/view.util');
const { findFilteredSubjectOptions } = require('../shared/subject-options.service');
const { buildQuickReportContext } = require('../shared/page-context.util');
const {
    groupActivitiesByDay,
    deriveProjectCreationDate,
    buildProjectParticipantRows,
} = require('../shared/activity-sections.util');
const { getLatestReportsByType } = require('../reports/reports.service');

const renderProjects = function renderProjects(req, res) {
    const query = req.query.q || '';
    const projects = filterByQuery(listProjects(), query, ['name', 'description', 'status']);

    return renderModule(res, 'pages/projects', {
        activeRoute: '/projects',
        pageTitle: 'Project',
        pageSubtitle: 'Intermediate selection for own and other projects.',
        projects,
        query,
    });
};

const renderProjectDetail = function renderProjectDetail(req, res) {
    const project = listProjects().find((candidate) => candidate.id === req.params.id);
    const currentUser = req.session.user;

    if (!project) {
        req.session.flash = {
            type: 'danger',
            message: 'Project not found.',
        };

        return res.redirect('/projects');
    }

    const isParticipant = project.participants.some((participant) => {
        return participant.id === req.session.user.employeeId;
    });

    const { currentDateLabel, quickReport } = buildQuickReportContext('PROJECT', project.id);

    const activitySections = groupActivitiesByDay(project.activityLog);
    const creationDate = deriveProjectCreationDate(project);
    const participantRows = buildProjectParticipantRows(project);

    return renderModule(res, 'pages/projectDetail', {
        activeRoute: '/projects',
        pageTitle: project.name,
        pageSubtitle: 'Project page with goals, achievements, highlights, and participants.',
        project,
        isParticipant,
        reportSubjects: findFilteredSubjectOptions(currentUser.employeeId, currentUser.roleName),
        defaultReportType: 'PROJECT',
        defaultSubjectId: project.id,
        currentDateLabel,
        quickReport,
        activitySections,
        creationDate,
        participantRows,
        latestReports: getLatestReportsByType(),
    });
};

const handleProjectMembership = function handleProjectMembership(req, res) {
    setProjectMembership(req.params.id, req.session.user.employeeId);

    req.session.flash = {
        type: 'success',
        message: 'Project participation updated.',
    };

    return res.redirect(`/projects/${req.params.id}`);
};

module.exports = {
    renderProjects,
    renderProjectDetail,
    handleProjectMembership,
};
