// Activity Model
// Activity(activity_id, project_id, employee_id, entry_id, title, description, completed_at)

const db = require('../utils/database.js');

module.exports = class Activity {

    constructor(activity_id, project_id, employee_id, entry_id, title, description, completed_at) {
        this.activity_id = activity_id;
        this.project_id = project_id;
        this.employee_id = employee_id;
        this.entry_id = entry_id;
        this.title = title;
        this.description = description;
        this.completed_at = completed_at;
    }

    /*getTeamMembersActivities(team_id)
    Function responsible for returning all activies from Team members
    whose id=team_id*/

    static getTeamMembersActivities(team_id, start_date = null, end_date = null){
        const conditions = ['ET.team_id=?'];
        const parameters = [team_id];

        if (start_date) {
            conditions.push('A.completed_at >= ?');
            parameters.push(start_date);
        }

        if (end_date) {
            conditions.push('A.completed_at <= ?');
            parameters.push(end_date);
        }

        return db.execute(`
            SELECT A.activity_id, A.project_id, A.title, A.description, A.completed_at, A.employee_id, E.full_name, ET.role 
            FROM activity as A 
            INNER JOIN employee as E ON A.employee_id=E.employee_id 
            INNER JOIN employeeteam as ET ON ET.employee_id=E.employee_id 
            WHERE ${conditions.join(' AND ')}
            ORDER BY A.completed_at DESC, A.title ASC;`,
            parameters);
    }

    /*fetchByEmployee(employee_id)
    Function responsible for returning all activities from an employee.*/

    static fetchByEmployee(employee_id, start_date = null, end_date = null){
        const conditions = ['A.employee_id=?'];
        const parameters = [employee_id];

        if (start_date) {
            conditions.push('A.completed_at >= ?');
            parameters.push(start_date);
        }

        if (end_date) {
            conditions.push('A.completed_at <= ?');
            parameters.push(end_date);
        }

        return db.execute(`
            SELECT A.activity_id, A.project_id, A.title, A.description, A.completed_at, E.full_name 
            FROM activity as A 
            INNER JOIN employee AS E ON E.employee_id=A.employee_id 
            WHERE ${conditions.join(' AND ')}
            ORDER BY A.completed_at DESC, A.title ASC;`
            ,parameters);
    }

    /*fetchByProject(project_id)
    Function responsible for returning all activities related to a Project.*/

    static fetchByProject(project_id) {
        return db.execute(
            `SELECT
                A.activity_id,
                A.project_id,
                A.employee_id,
                A.entry_id,
                A.title,
                A.description,
                A.completed_at,
                E.full_name
            FROM activity AS A
            LEFT JOIN employee AS E
                ON E.employee_id = A.employee_id
            WHERE A.project_id = ?
            ORDER BY A.completed_at DESC, A.title ASC`,
            [project_id],
        );
    }

    /*fetchByProjectBetween(project_id, start_date, end_date)
    Function responsible for returning all activities related to a project
    possibly between certain date range.*/

    static fetchByProjectBetween(project_id, start_date, end_date) {
        const conditions = ['A.project_id = ?'];
        const parameters = [project_id];

        if (start_date) {
            conditions.push('A.completed_at >= ?');
            parameters.push(start_date);
        }

        if (end_date) {
            conditions.push('A.completed_at <= ?');
            parameters.push(end_date);
        }

        return db.execute(
            `SELECT
                A.activity_id,
                A.project_id,
                A.employee_id,
                A.entry_id,
                A.title,
                A.description,
                A.completed_at,
                E.full_name
            FROM activity AS A
            LEFT JOIN employee AS E
                ON E.employee_id = A.employee_id
            WHERE ${conditions.join(' AND ')}
            ORDER BY A.completed_at DESC, A.title ASC`,
            parameters,
        );
    }

//-------------- Report Queries--------------------

    /*getProjectActivities(project_ids, start_date, end_date)
    Function responsible for returning all project information
    related to the project_ids passed as a parameter.*/

    static getProjectActivities(project_ids, start_date, end_date){
        if(project_ids.length===0){
            return Promise.resolve([[]]);
        }
        const placeholders = project_ids.map(() => '?').join(',');

        return db.execute(`
            SELECT A.title, A.description, A.completed_at, A.employee_id, A.team_id,A.project_id, E.full_name 
            FROM activity AS A 
            INNER JOIN employee AS E ON A.employee_id=E.employee_id 
            WHERE (completed_at BETWEEN ? AND ?) AND project_id IN (${placeholders});`,
            [start_date, end_date, ...project_ids]);
    }

//-------------------------------------------------------

    // Create or Update activity
    save() {
        // TODO: Implement database logic
        // If activity_id exists, update; otherwise, insert new record
    }

    // Read all activities
    static fetchAll() {
        // TODO: Implement database query to fetch all activities
    }

    // Read activity by ID
    static fetchById(activity_id) {
        // TODO: Implement database query to fetch activity by ID
    }

    // Read activities by daily entry
    static fetchByEntry(entry_id) {
        // TODO: Implement database query to fetch activities by daily entry
    }

    // Update activity
    static update(activity_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete activity
    static delete(activity_id) {
        // TODO: Implement database delete logic
    }

};
