/*
Title: search.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Employee = require('../../models/employee');
const Team = require('../../models/team');
const Project = require('../../models/project');
const { getInitials } = require('../../utils/avatar.util');
const AUTOCOMPLETE_SECTION_LIMIT = 3;
const AUTOCOMPLETE_TOTAL_LIMIT = 5;

const normalizeSearchQuery = function normalizeSearchQuery(value) {
    return typeof value === 'string' ? value.trim() : '';
};

const wantsJsonResponse = function wantsJsonResponse(request) {
    const acceptHeader = request.get('Accept') || '';
    return acceptHeader.includes('application/json');
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

const buildAutocompleteSuggestions = function buildAutocompleteSuggestions(
    employees,
    teams,
    projects,
    employeeId,
) {
    const employeeSuggestions = employees
        .slice(0, AUTOCOMPLETE_SECTION_LIMIT)
        .map((employee) => {
            const result = mapEmployeeResult(employee, employeeId);

            return {
                title: result.title,
                subtitle: result.subtitle,
                badge: employee.employee_id === employeeId ? 'My profile' : 'Employee',
                url: result.url,
            };
        });
    const teamSuggestions = teams
        .slice(0, AUTOCOMPLETE_SECTION_LIMIT)
        .map((team) => {
            const result = mapTeamResult(team);

            return {
                title: result.title,
                subtitle: result.subtitle,
                badge: team.is_member ? 'My team' : 'Team',
                url: result.url,
            };
        });
    const projectSuggestions = projects
        .slice(0, AUTOCOMPLETE_SECTION_LIMIT)
        .map((project) => {
            const result = mapProjectResult(project);

            return {
                title: result.title,
                subtitle: result.subtitle,
                badge: project.is_member ? 'My project' : 'Project',
                url: result.url,
            };
        });

    const suggestionBuckets = [
        [...employeeSuggestions],
        [...teamSuggestions],
        [...projectSuggestions],
    ];
    const suggestions = [];

    while (
        suggestions.length < AUTOCOMPLETE_TOTAL_LIMIT
        && suggestionBuckets.some((bucket) => bucket.length > 0)
    ) {
        suggestionBuckets.forEach((bucket) => {
            if (suggestions.length >= AUTOCOMPLETE_TOTAL_LIMIT || bucket.length === 0) {
                return;
            }

            suggestions.push(bucket.shift());
        });
    }

    return suggestions;
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
    const isJsonRequest = wantsJsonResponse(request);

    if (!query) {
        if (isJsonRequest) {
            return response.status(200).json({
                query,
                suggestions: [],
            });
        }

        return renderSearchPage(request, response, 200, {
            query,
            resultSections: [],
            totalResults: 0,
        });
    }

    const searchPromises = isJsonRequest
        ? [
            Employee.getDirectorySuggestionsByLeadScope(employeeId, query),
            Team.getDirectorySuggestions(employeeId, query),
            Project.getDirectorySuggestions(employeeId, query),
        ]
        : [
            Employee.searchDirectoryByLeadScope(employeeId, query),
            Team.searchDirectory(employeeId, query),
            Project.searchDirectory(employeeId, query),
        ];

    return Promise.all(searchPromises)
        .then(([
            [employees],
            [teams],
            [projects],
        ]) => {
            if (isJsonRequest) {
                return response.status(200).json({
                    query,
                    suggestions: buildAutocompleteSuggestions(employees, teams, projects, employeeId),
                });
            }

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

            if (isJsonRequest) {
                return response.status(500).json({
                    query,
                    suggestions: [],
                    error: 'Unable to search right now.',
                });
            }

            return renderSearchPage(request, response, 500, {
                query,
                resultSections: [],
                totalResults: 0,
                errorMessage: 'Unable to search right now.',
            });
        });
};
