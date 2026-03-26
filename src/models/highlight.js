// Highlight Model
// Highlight(highlight_id, employee_id, project_id, title, content, created_at)

const db = require('../utils/database.js');

module.exports = class Highlight {

    constructor(highlight_id, employee_id, project_id, title, content, created_at) {
        this.highlight_id = highlight_id;
        this.employee_id = employee_id;
        this.project_id = project_id;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
    }

    // Create or Update highlight
    save() {
        // TODO: Implement database logic
        // If highlight_id exists, update; otherwise, insert new record
    }

    // Read all highlights
    static fetchAll() {
        // TODO: Implement database query to fetch all highlights
    }

    // Read highlight by ID
    static fetchById(highlight_id) {
        // TODO: Implement database query to fetch highlight by ID
    }

    // Read highlights by employee
    static fetchByEmployee(employee_id) {
        // TODO: Implement database query to fetch highlights by employee
    }

    // Read highlights by project
    static fetchByProject(project_id) {
        return db.execute(
            `SELECT
                H.highlight_id,
                H.employee_id,
                H.project_id,
                H.title,
                H.content,
                H.created_at,
                E.full_name
            FROM highlight AS H
            LEFT JOIN employee AS E
                ON E.employee_id = H.employee_id
            WHERE H.project_id = ?
            ORDER BY H.created_at DESC, H.title ASC`,
            [project_id],
        );
    }

    // Update highlight
    static update(highlight_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete highlight
    static delete(highlight_id) {
        // TODO: Implement database delete logic
    }

};
