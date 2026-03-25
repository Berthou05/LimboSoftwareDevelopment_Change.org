/*
Title: team.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Team = require('../../models/team');

const PAGE_TITLE = 'Team';
const PAGE_SUBTITLE = 'Intermediate selection for own and other teams.';

const normalizeTeam = function normalizeTeam(team) {
    return {
        id: team.id ?? team.team_id ?? null,
        name: team.name ?? 'Unnamed team',
        leadName:
            team.leadName ??
            team.lead_name ??
            team.lead?.fullName ??
            'Pending assignment',
        description: team.description ?? 'No team description has been added yet.',
        image: team.image ?? null,
        isMember: Boolean(team.isMember ?? team.is_member),
    };
};

const buildSuggestion = function buildSuggestion(team) {
    return {
        id: team.id,
        name: team.name,
        leadName: team.leadName,
        isMember: team.isMember,
    };
};

const buildDirectoryViewModel = function buildDirectoryViewModel(employeeId, query) {
    const directoryPromise = Team.fetchDirectory(employeeId, query);
    const suggestionsPromise = query === ''
        ? Promise.resolve([[], []])
        : Team.fetchDirectorySuggestions(employeeId, query);

    return Promise.all([directoryPromise, suggestionsPromise])
        .then(([[directoryRows], [suggestionRows]]) => {
            const teams = directoryRows.map(normalizeTeam);
            const suggestions = suggestionRows.map(normalizeTeam).map(buildSuggestion);
            const myTeams = teams.filter((team) => team.isMember);
            const otherTeams = teams.filter((team) => !team.isMember);

            return {
                myTeams,
                otherTeams,
                query,
                suggestions,
                totalTeams: teams.length,
            };
        });
};

const renderDirectoryResults = function renderDirectoryResults(app, viewModel) {
    return new Promise((resolve, reject) => {
        app.render(
            'partials/teamDirectory/teamDirectoryResults',
            {
                myTeams: viewModel.myTeams,
                otherTeams: viewModel.otherTeams,
            },
            (error, html) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(html);
            },
        );
    });
};

exports.getTeams = (request, response, next) => {
    const query = String(request.query.q || '').trim();
    const employeeId = request.session.employeeId || '';

    buildDirectoryViewModel(employeeId, query)
        .then((viewModel) => {
            return response.render('pages/teamDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: PAGE_TITLE,
                pageSubtitle: PAGE_SUBTITLE,
                query: viewModel.query,
                myTeams: viewModel.myTeams,
                otherTeams: viewModel.otherTeams,
            });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
};

exports.searchTeams = (request, response, next) => {
    const query = String(request.query.q || '').trim();
    const employeeId = request.session.employeeId || '';

    buildDirectoryViewModel(employeeId, query)
        .then((viewModel) => {
            return renderDirectoryResults(request.app, viewModel)
                .then((resultsHtml) => {
                    return response.json({
                        query: viewModel.query,
                        resultsHtml,
                        suggestions: viewModel.suggestions,
                        totalTeams: viewModel.totalTeams,
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
};

exports.getTeamDetails = (request, response, next) => {
    const teamId = request.params.team_id;
    Team.findById(teamId)
        .then(([teamRows]) => {
            if (!teamRows || teamRows.length === 0) {
                return response.status(404).render('pages/team', {
                    error: 'Team not found',
                    csrfToken: request.csrfToken(),
                    isLoggedIn: request.session.isLoggedIn || '',
                    username: request.session.username || '',
                });
            }
            // Aquí podrías buscar los proyectos asociados si tienes el modelo Project
            return response.render('pages/team', {
                team: teamRows[0],
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
            });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
};
