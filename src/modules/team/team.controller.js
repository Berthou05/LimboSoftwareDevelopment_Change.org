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
        id: team.team_id ?? null,
        name: team.name ?? 'Unnamed team',
        leadName:
            team.full_name ??
            'Pending assignment',
        description: team.description ?? 'No team description has been added yet.',
        image: team.image ?? null,
        isMember: Boolean(team.isMember ?? team.is_member),
    };
}


/*getTeams
Function responsible for the obtention of the Teams in the Intermediate
Teams page.
This is only the initial render, returning no search results.
*/

exports.getTeams = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    Team.fetchByEmployeeId(employeeId).then(([teams, fieldData])=>{
        Team.fetchNotByEmployeeId(employeeId).then(([notTeams, fieldData])=>{
            return response.render('pages/teamDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: PAGE_TITLE,
                pageSubtitle: PAGE_SUBTITLE,
                myTeams:teams,
                otherTeams:notTeams,
                query:'',
            });
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/home');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/home');
    })
};


exports.getTeamPage = (request, response, next) => {
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

exports.searchTeams = (request, response, next) => {
    return response.json({
                        query: '',
                        resultsHtml: '',
                        suggestions: '',
                        totalTeams: '',
                    });
};
