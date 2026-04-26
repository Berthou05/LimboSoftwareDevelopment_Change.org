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

    /*create(employee_id, project_id, title, content)
    Function responsible for creating a new highlight from the add popup.*/

    static create(employee_id, project_id, title, content) {
        return db.execute(
            `INSERT INTO highlight (
                highlight_id,
                employee_id,
                project_id,
                title,
                content,
                created_at
            ) VALUES (UUID(), ?, ?, ?, ?, NOW())`,
            [employee_id, project_id, title, content],
        );
    }

    /*fetchById(highlight_id)
    Function responsible for reading one highlight. It is used to validate edit/delete operations.*/

    static fetchById(highlight_id) {
        return db.execute(
            `SELECT
                highlight_id,
                employee_id,
                project_id,
                title,
                content,
                created_at
            FROM highlight
            WHERE highlight_id = ?
            LIMIT 1`,
            [highlight_id],
        );
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

    /*update(highlight_id, project_id, title, content)
    Function responsible for updating one highlight inside its project.*/

    static update(highlight_id, project_id, title, content) {
        return db.execute(
            `UPDATE highlight
            SET
                title = ?,
                content = ?
            WHERE highlight_id = ?
                AND project_id = ?`,
            [title, content, highlight_id, project_id],
        );
    }

    /*delete(highlight_id, project_id)
    Function responsible for deleting one highlight. project_id is optional and used as a safety filter in project routes.*/

    static delete(highlight_id, project_id = null) {
        if (project_id) {
            return db.execute(
                'DELETE FROM highlight WHERE highlight_id = ? AND project_id = ?',
                [highlight_id, project_id],
            );
        }

        return db.execute('DELETE FROM highlight WHERE highlight_id = ?', [highlight_id]);
    }

    /*fetchByEmployee(employee_id)
    Function responsible for reading all highlights created by an employee, ordered by creation date.*/

    static fetchByEmployee(employee_id) {
        return db.execute(
            `SELECT
                highlight_id,
                employee_id,
                project_id,
                title,
                content,
                created_at
            FROM highlight
            WHERE employee_id = ?
            ORDER BY created_at DESC`,
            [employee_id],
        );
    }

    /**/

        static getProjectHighlights(project_ids, start_date, end_date){
            if(!project_ids.length){
                return Promise.resolve([[]]);
            }
            const placeholders = project_ids.map(() => '?').join(',');
            
            return db.execute(`
                SELECT H.title, H.content, H.project_id AS 'p'
                FROM highlight as H
                WHERE (H.created_at BETWEEN ? AND ?) AND H.project_id IN (${placeholders});`,
                [start_date, end_date, ...project_ids]);
        }
};
