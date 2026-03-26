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

    // Delete goal
    static delete(goal_id) {
        return db.execute('DELETE FROM goal WHERE goal_id=?',[goal_id]);
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

    // Create or Update goal
    save() {
        // TODO: Implement database logic
        // If goal_id exists, update; otherwise, insert new record
    }

    // Read all goals
    static fetchAll() {
        // TODO: Implement database query to fetch all goals
    }

    // Read goal by ID
    static fetchById(goal_id) {
        // TODO: Implement database query to fetch goal by ID
    }

    

    // Read goals by responsible employee
    static fetchByResponsible(employee_responsible_id) {
        // TODO: Implement database query to fetch goals by responsible employee
    }

    // Read goals by status
    static fetchByStatus(status) {
        // TODO: Implement database query to fetch goals by status
    }

    // Update goal
    static update(goal_id, updateData) {
        // TODO: Implement database update logic
    }



};

module.exports.Status = Status;
