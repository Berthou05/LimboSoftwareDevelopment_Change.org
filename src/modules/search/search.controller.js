/*
Title: search.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Employee = require('../../models/employee');
const Team = require('../../models/team');
const Project = require('../../models/project');
const { getInitials } = require('../../utils/avatar.util');

const normalizeSearchQuery = function normalizeSearchQuery(value) {
    return typeof value === 'string' ? value.trim() : '';
};

const mapEmployeeResult = function mapEmployeeResult(employee, currentEmployeeId) {
    const title = employee.full_name || 'Unknown employee';
    const slackUsername = employee.slack_username || '';
    const email = employee.email || '';

    return {
        type: 'employee',
        label: 'Employee',
        title,
        subtitle: email || (slackUsername ? `@${slackUsername}` : 'Employee profile'),
        description: slackUsername && email ? `@${slackUsername}` : '',
        image: employee.image || '',
        initials: getInitials(title, 'E'),
        url: `/employees/${employee.employee_id}`,
        badge: employee.employee_id === currentEmployeeId ? 'My profile' : '',
    };
};

const mapTeamResult = function mapTeamResult(team) {
    const title = team.name || 'Untitled team';

    return {
        type: 'team',
        label: 'Team',
        title,
        subtitle: `Lead: ${team.full_name || 'Pending assignment'}`,
        description: team.description || 'No description available.',
        image: team.image || '',
        initials: getInitials(title, 'T'),
        url: `/teams/${team.team_id}`,
        badge: team.is_member ? 'Member' : '',
    };
};

const mapProjectResult = function mapProjectResult(project) {
    const title = project.name || 'Untitled project';

    return {
        type: 'project',
        label: 'Project',
        title,
        subtitle: `Lead: ${project.lead_name || 'Pending assignment'}`,
        description: project.description || 'No description available.',
        image: project.image || '',
        initials: getInitials(title, 'P'),
        url: `/projects/${project.project_id}`,
        badge: project.is_member ? 'Member' : '',
    };
};

const buildResultSections = function buildResultSections(employees, teams, projects, employeeId) {
    return [
        {
            id: 'employees',
            title: 'Employees',
            results: employees.map((employee) => mapEmployeeResult(employee, employeeId)),
        },
        {
            id: 'teams',
            title: 'Teams',
            results: teams.map(mapTeamResult),
        },
        {
            id: 'projects',
            title: 'Projects',
            results: projects.map(mapProjectResult),
        },
    ];
};

const renderSearchPage = function renderSearchPage(request, response, statusCode, viewData) {
    return response.status(statusCode).render('pages/search', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || '',
        username: request.session.username || '',
        pageTitle: 'Search results',
        globalSearchQuery: viewData.query || '',
        query: viewData.query || '',
        resultSections: viewData.resultSections || [],
        totalResults: viewData.totalResults || 0,
        errorMessage: viewData.errorMessage || '',
    });
};

exports.getSearch = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const query = normalizeSearchQuery(request.query.q);

    if (!query) {
        return renderSearchPage(request, response, 200, {
            query,
            resultSections: [],
            totalResults: 0,
        });
    }

    return Promise.all([
        Employee.searchDirectoryByLeadScope(employeeId, query),
        Team.searchDirectory(employeeId, query),
        Project.searchDirectory(employeeId, query),
    ])
        .then(([
            [employees],
            [teams],
            [projects],
        ]) => {
            const resultSections = buildResultSections(employees, teams, projects, employeeId);
            const totalResults = resultSections.reduce((total, section) => {
                return total + section.results.length;
            }, 0);

            return renderSearchPage(request, response, 200, {
                query,
                resultSections,
                totalResults,
            });
        })
        .catch((error) => {
            console.log(error);
            return renderSearchPage(request, response, 500, {
                query,
                resultSections: [],
                totalResults: 0,
                errorMessage: 'Unable to search right now.',
            });
        });
};
