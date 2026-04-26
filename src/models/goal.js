// Goal Model
// Goal(goal_id, project_id, employee_responsible_id, title, description, due_date, status, created_at)

const db = require('../utils/database.js');

const Status = {
    PLANNED: 'PLANNED',
    IN_PROGRESS: 'IN_PROGRESS',
    ON_HOLD: 'ON_HOLD',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

module.exports = class Goal {

    constructor(goal_id, project_id, employee_responsible_id, title, description, due_date, status, created_at) {
        this.goal_id = goal_id;
        this.project_id = project_id;
        this.employee_responsible_id = employee_responsible_id;
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.status = status; // Status ENUM
        this.created_at = created_at;
    }

    /*fetchByProject(project_id)
    Function responsible for returning all Goals related to a project_id*/

    static fetchByProject(project_id) {
        return db.execute(
            `SELECT
                G.goal_id,
                G.project_id,
                G.employee_responsible_id,
                G.title,
                G.description,
                G.due_date,
                G.status,
                G.created_at,
                E.full_name
            FROM goal AS G
            LEFT JOIN employee AS E
                ON E.employee_id = G.employee_responsible_id
            WHERE G.project_id = ?
            ORDER BY
                CASE WHEN G.due_date IS NULL THEN 1 ELSE 0 END,
                G.due_date ASC,
                G.created_at DESC;`,
            [project_id],
        );
    }

    /*fetchByResponsibleEmployee(employee_responsible_id)
    Function responsible for returning all goals for which the employee is responsible.*/

    static fetchByResponsibleEmployee(employee_responsible_id) {
        return db.execute(
            `SELECT
                G.goal_id,
                G.project_id,
                G.employee_responsible_id,
                G.title,
                G.description,
                G.due_date,
                G.status,
                G.created_at
            FROM goal AS G
            WHERE G.employee_responsible_id = ?
            ORDER BY G.created_at DESC;`,
            [employee_responsible_id],
        );
    }

    /*create(project_id, employee_responsible_id, title, description, due_date, status)
    Function responsible for creating a new goal for a project. This is used by the popup "Add Goal" flow.*/

    static create(project_id, employee_responsible_id, title, description, due_date, status) {
        return db.execute(
            `INSERT INTO goal (
                goal_id,
                project_id,
                employee_responsible_id,
                title,
                description,
                due_date,
                status,
                created_at
            ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, NOW())`,
            [project_id, employee_responsible_id, title, description, due_date, status],
        );
    }

    /*fetchById(goal_id)
    Function responsible for reading a single goal by id. It is used to validate edit/delete operations.*/

    static fetchById(goal_id) {
        return db.execute(
            `SELECT
                goal_id,
                project_id,
                employee_responsible_id,
                title,
                description,
                due_date,
                status,
                created_at
            FROM goal
            WHERE goal_id = ?
            LIMIT 1`,
            [goal_id],
        );
    }

    /*update(goal_id, project_id, title, description, due_date, status)
    Function responsible for updating one goal in the same project where it belongs.*/

    static update(goal_id, project_id, title, description, due_date, status) {
        return db.execute(
            `UPDATE goal
            SET
                title = ?,
                description = ?,
                due_date = ?,
                status = ?
            WHERE goal_id = ?
                AND project_id = ?`,
            [title, description, due_date, status, goal_id, project_id],
        );
    }

    /*delete(goal_id, project_id)
    Function responsible for deleting one goal. project_id is optional and used as a safety filter in project routes.*/

    static delete(goal_id, project_id = null) {
        if (project_id) {
            return db.execute(
                'DELETE FROM goal WHERE goal_id = ? AND project_id = ?',
                [goal_id, project_id],
            );
        }

        return db.execute('DELETE FROM goal WHERE goal_id = ?', [goal_id]);
    }

    // ----------------------- Report Functions ---------------------------

    /*getProjectGoals(project_ids, start_date, end_date)
    Function responsible for obtaining all goal information from the 
    project_ids given between the date range specified.*/

    static getProjectGoals(project_ids, start_date, end_date){
        if(!project_ids.length){
            return Promise.resolve([[]]);
        }
        const placeholders = project_ids.map(() => '?').join(',');
        
        return db.execute(`
            SELECT G.title, G.description, G.status, G.project_id as 'p', G.due_date 
            FROM goal AS G 
            WHERE (G.created_at BETWEEN ? AND ?) AND project_id IN (${placeholders});`,
            [start_date, end_date, ...project_ids]);
    }
};

module.exports.Status = Status;
