// ProjectTeam Model (Junction Table)
// ProjectTeam(team_id, project_id, team_role, joined_at)

const db = require('../utils/database');

module.exports = class ProjectTeam {
    constructor(team_id, project_id, team_role, joined_at) {
        this.team_id = team_id;
        this.project_id = project_id;
        this.team_role = team_role;
        this.joined_at = joined_at;
    }

    // Create or Update project-team assignment
    save() {
        // If exists, update; else, insert
        return db.execute(
            'INSERT INTO projectteam (team_id, project_id, team_role, joined_at) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE team_role = VALUES(team_role), joined_at = VALUES(joined_at)',
            [this.team_id, this.project_id, this.team_role, this.joined_at]
        );
    }

    // Read all project-team assignments
    static fetchAll() {
        return db.execute('SELECT * FROM projectteam');
    }

    // Read assignments by team ID
    static fetchByTeam(team_id) {
        return db.execute('SELECT * FROM projectteam WHERE team_id = ?', [team_id]);
    }

    // Read assignments by project ID
    static fetchByProject(project_id) {
        return db.execute('SELECT * FROM projectteam WHERE project_id = ?', [project_id]);
    }

    static fetchDetailedByProject(project_id) {
        return db.execute(
            `SELECT
                PT.team_id,
                PT.project_id,
                PT.team_role,
                PT.joined_at,
                T.name,
                T.description,
                T.image,
                T.status
            FROM projectteam AS PT
            LEFT JOIN team AS T
                ON T.team_id = PT.team_id
            WHERE PT.project_id = ?
            ORDER BY T.name ASC`,
            [project_id],
        );
    }

    // Read specific assignment
    static fetchByTeamAndProject(team_id, project_id) {
        return db.execute('SELECT * FROM projectteam WHERE team_id = ? AND project_id = ?', [team_id, project_id]);
    }

    // Update assignment
    static update(team_id, project_id, updateData) {
        const fields = [];
        const values = [];
        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }
        if (!fields.length) return Promise.resolve();
        values.push(team_id, project_id);
        return db.execute(
            `UPDATE projectteam SET ${fields.join(', ')} WHERE team_id = ? AND project_id = ?`,
            values
        );
    }

    // Delete assignment
    static delete(team_id, project_id) {
        return db.execute('DELETE FROM projectteam WHERE team_id = ? AND project_id = ?', [team_id, project_id]);
    }
};
