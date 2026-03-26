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

    /*fetchByEmployeeBtw(employee_id, start_date, end_date)
    Function responsible for returning all employee activities between
    start and end date*/
    
    static fetchByEmployeeBtw(employee_id, start_date, end_date) {
        return db.execute('SELECT title, description, completed_at, project_id FROM activity WHERE employee_id=? AND completed_at BETWEEN ? AND ?',
            [employee_id, start_date, end_date]);
    }

    /*getTeamActivitiesFromEmpBtw(employee_id,start_date, end_date)
    Function responsible for obtaining all the team member activies 
    from all teams of the employee with id=employee_id*/

    static getTeamActivitiesFromEmpBtw(employee_id,start_date, end_date){
        return db.execute('SELECT A.title, A.description, A.completed_at, A.employee_id, A.project_id FROM activity as A WHERE (A.completed_at BETWEEN ? AND ?) AND employee_id IN ( SELECT ET.employee_id FROM employeeteam as ET WHERE ET.team_id IN( SELECT ET.team_id FROM employeeteam as ET WHERE ET.employee_id = ?));',
            [start_date, end_date, employee_id]);
    }

    /*getProjectActivitiesFromEmpBtw(employee_id, start_date, end_date)
    Function responsible for obtainig all activities related to the
    projects where the employee with id=employee_id has collaborated
    between the provided date range*/
    
    static getProjectActivitiesFromEmpBtw(employee_id, start_date, end_date){
        return db.execute('SELECT A.title, A.description, A.completed_at, A.project_id, A.employee_id FROM activity as A INNER JOIN collaboration as C ON A.project_id=C.project_id WHERE C.project_id IN( SELECT C.project_id FROM collaboration as C WHERE C.employee_id=? AND C.started_at>=? AND (C.ended_at<= ? OR C.ended_at IS NULL))',
            [employee_id, start_date, end_date]);
    }

    /*getTeamMembersActivities(team_id)
    Function responsible for returning all activies from Team members
    whose id=team_id*/

    static getTeamMembersActivities(team_id){
        return db.execute('SELECT A.activity_id, A.project_id, A.title, A.description, A.completed_at, A.employee_id, E.full_name, ET.role FROM activity as A INNER JOIN employee as E ON A.employee_id=E.employee_id INNER JOIN employeeteam as ET ON ET.employee_id=E.employee_id WHERE ET.team_id=?;',
            [team_id]);
    }

    /*fetchByEmployee(employee_id)
    Function responsible for returning all activities from an employee.*/

    static fetchByEmployee(employee_id){
        return db.execute('SELECT * FROM activity as A WHERE A.employee_id=?;'
            ,[employee_id]);
    }

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

    // Read activities by project
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
