/*
Title: team.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Team = require('../../models/team');

function normalizeTeam(team) {
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
}

exports.getTeams = (request, response, next) => {
    const query = String(request.query.q || '').trim();
    const employeeId = request.session.employeeId || '';

    Team.fetchDirectory(employeeId, query)
        .then(([rows]) => {
            const teams = rows.map(normalizeTeam);
            const myTeams = teams.filter((team) => team.isMember);
            const otherTeams = teams.filter((team) => !team.isMember);

            return response.render('pages/teamDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: 'Team',
                pageSubtitle: 'Intermediate selection for own and other teams.',
                query,
                myTeams,
                otherTeams,
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
        .then(([teamRows, fieldData]) => {
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
