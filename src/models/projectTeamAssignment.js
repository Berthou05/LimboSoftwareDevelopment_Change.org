// ProjectTeam Model (Junction Table)
// ProjectTeam(team_id, project_id, team_role, joined_at)

module.exports = class ProjectTeam {

    constructor(team_id, project_id, team_role, joined_at) {
        this.team_id = team_id;
        this.project_id = project_id;
        this.team_role = team_role;
        this.joined_at = joined_at;
    }

    // Create or Update project-team assignment
    save() {
        // TODO: Implement database logic
        // If relationship exists, update; otherwise, insert new record
    }

    // Read all project-team assignments
    static fetchAll() {
        // TODO: Implement database query to fetch all assignments
    }

    // Read assignments by team ID
    static fetchByTeam(team_id) {
        // TODO: Implement database query to fetch all projects for a team
    }

    // Read assignments by project ID
    static fetchByProject(project_id) {
        // TODO: Implement database query to fetch all teams in a project
    }

    // Read specific assignment
    static fetchByTeamAndProject(team_id, project_id) {
        // TODO: Implement database query to fetch specific assignment
    }

    // Update assignment
    static update(team_id, project_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete assignment
    static delete(team_id, project_id) {
        // TODO: Implement database delete logic
    }

};
