// Collaboration Model
// Collaboration(collaboration_id, project_id, employee_id, description, started_at, ended_at)

const db = require('../utils/database');

module.exports = class Collaboration {
    constructor(collaboration_id, project_id, employee_id, description, started_at, ended_at) {
        this.collaboration_id = collaboration_id;
        this.project_id = project_id;
        this.employee_id = employee_id;
        this.description = description;
        this.started_at = started_at;
        this.ended_at = ended_at;
    }

    // Read active collaborations by employee (ended_at IS NULL)
    static fetchActiveByEmployee(employee_id) {
        return db.execute('SELECT * FROM collaboration WHERE employee_id = ? AND ended_at IS NULL', [employee_id]);
    }

    // Read active collaborations by project (ended_at IS NULL)
    static fetchActiveByProject(project_id) {
        return db.execute('SELECT * FROM collaboration WHERE project_id = ? AND ended_at IS NULL', [project_id]);
    }

    static fetchDetailedByProject(project_id) {
        return db.execute(
            `SELECT
                C.collaboration_id,
                C.project_id,
                C.employee_id,
                C.description,
                C.started_at,
                C.ended_at,
                E.full_name
            FROM collaboration AS C
            LEFT JOIN employee AS E
                ON E.employee_id = C.employee_id
            WHERE C.project_id = ?
                AND C.ended_at IS NULL
            ORDER BY E.full_name ASC`,
            [project_id],
        );
    }

    static findActiveByProjectAndEmployee(project_id, employee_id) {
        return db.execute(
            `SELECT *
            FROM collaboration
            WHERE project_id = ?
                AND employee_id = ?
                AND ended_at IS NULL`,
            [project_id, employee_id],
        );
    }

    static joinProject(project_id, employee_id, description = 'Joined from project detail page.') {
        return db.execute(
            `INSERT INTO collaboration (
                collaboration_id,
                project_id,
                employee_id,
                description,
                started_at,
                ended_at
            ) VALUES (UUID(), ?, ?, ?, NOW(), NULL)`,
            [project_id, employee_id, description],
        );
    }

    static leaveProject(project_id, employee_id, ended_at = new Date()) {
        return db.execute(
            `UPDATE collaboration
            SET ended_at = ?
            WHERE project_id = ?
                AND employee_id = ?
                AND ended_at IS NULL`,
            [ended_at, project_id, employee_id],
        );
    }


    // Create or Update collaboration
    save() {
        // If collaboration_id exists, update; otherwise, insert new record
        if (this.collaboration_id) {
            // Update existing
            return db.execute(
                'UPDATE collaboration SET project_id=?, employee_id=?, description=?, started_at=?, ended_at=? WHERE collaboration_id=?',
                [this.project_id, this.employee_id, this.description, this.started_at, this.ended_at, this.collaboration_id]
            );
        } else {
            // Insert new
            return db.execute(
                'INSERT INTO collaboration (project_id, employee_id, description, started_at, ended_at) VALUES (?, ?, ?, ?, ?)',
                [this.project_id, this.employee_id, this.description, this.started_at, this.ended_at]
            );
        }
    }


    // Read all collaborations
    static fetchAll() {
        return db.execute('SELECT * FROM collaboration');
    }


    // Read collaboration by ID
    static fetchById(collaboration_id) {
        return db.execute('SELECT * FROM collaboration WHERE collaboration_id = ?', [collaboration_id]);
    }


    // Read collaborations by project
    static fetchByProject(project_id) {
        return db.execute('SELECT * FROM collaboration WHERE project_id = ?', [project_id]);
    }


    // Read collaborations by employee
    static fetchByEmployee(employee_id) {
        return db.execute('SELECT * FROM collaboration WHERE employee_id = ?', [employee_id]);
    }


    // Update collaboration
    static update(collaboration_id, updateData) {
        // Only updates fields provided in updateData
        const fields = [];
        const values = [];
        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }
        if (!fields.length) return Promise.resolve();
        values.push(collaboration_id);
        return db.execute(
            `UPDATE collaboration SET ${fields.join(', ')} WHERE collaboration_id = ?`,
            values
        );
    }


    // Delete collaboration
    static delete(collaboration_id) {
        return db.execute('DELETE FROM collaboration WHERE collaboration_id = ?', [collaboration_id]);
    }

};
