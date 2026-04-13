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

    /*findProjectMatch(project_hint)
    Function responsible for finding an active project that matches a
    provided hint text.*/

    static findProjectMatch(project_hint) {
        const normalizedHint = String(project_hint || '').trim();

        if (!normalizedHint) {
            return Promise.resolve([[]]);
        }

        return db.execute(
            `SELECT project_id
            FROM project
            WHERE (
                name LIKE ?
                OR ? LIKE CONCAT('%', name, '%')
            )
            AND status <> ?
            ORDER BY created_at DESC
            LIMIT 1`,
            [`%${normalizedHint}%`, normalizedHint, 'DISABLED'],
        );
    }

    /*create(entry_id, employee_id, project_id, title, description, completed_at)
    Function responsible for storing a generated activity linked to a
    daily entry.*/

    static create(entry_id, employee_id, project_id, title, description, completed_at = null) {
        return db.execute(
            `INSERT INTO activity(
                activity_id,
                project_id,
                employee_id,
                entry_id,
                title,
                description,
                completed_at
            ) VALUES(UUID(), ?, ?, ?, ?, ?, ?)`,
            [
                project_id || null,
                employee_id,
                entry_id,
                title,
                description,
                completed_at,
            ],
        );
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

    /*fetchByEmployeeBtw(employee_id, start_date, end_date)
    Function responsible for returning all employee activities between
    start and end date*/
    
    static fetchByEmployeeBtw(employee_id, start_date, end_date) {
        return db.execute(`
            SELECT title, description, completed_at, project_id 
            FROM activity 
            WHERE employee_id=? AND completed_at BETWEEN ? AND ?`,
            [employee_id, start_date, end_date]);
    }

    /*getTeamActivitiesFromEmpBtw(employee_id,start_date, end_date)
    Function responsible for obtaining all the team member activies 
    from all teams of the employee with id=employee_id*/

    static getTeamActivitiesFromEmpBtw(employee_id,start_date, end_date){
        return db.execute(`
            SELECT A.title, A.description, A.completed_at, A.employee_id, A.project_id 
            FROM activity as A 
            WHERE (A.completed_at BETWEEN ? AND ?) AND employee_id IN (
                SELECT ET.employee_id 
                FROM employeeteam as ET 
                WHERE ET.team_id IN( 
                    SELECT ET.team_id 
                    FROM employeeteam as ET 
                    WHERE ET.employee_id = ?));`,
            [start_date, end_date, employee_id]);
    }

    /*getProjectActivitiesFromEmpBtw(employee_id, start_date, end_date)
    Function responsible for obtainig all activities related to the
    projects where the employee with id=employee_id has collaborated
    between the provided date range*/
    
    static getProjectActivitiesFromEmpBtw(employee_id, start_date, end_date){
        return db.execute(`
            SELECT A.title, A.description, A.completed_at, A.project_id, A.employee_id 
            FROM activity as A 
            INNER JOIN collaboration as C ON A.project_id=C.project_id 
            WHERE C.project_id IN(
                SELECT C.project_id 
                FROM collaboration as C 
                WHERE C.employee_id=? AND C.started_at>=? AND (C.ended_at<= ? OR C.ended_at IS NULL))`,
            [employee_id, start_date, end_date]);
    }

    /*getEmployeeActivitiesFromTeamBtw(team_id,start_date, end_date)
    Function responsible of obtaining all the activities of the members
    of a team.*/

    static getEmployeeActivitiesFromTeamBtw(team_id,start_date, end_date){
        return db.execute(`
            SELECT A.title, A.description, A.completed_at, A.employee_id, A.project_id
            FROM activity as A 
            WHERE (A.completed_at BETWEEN ? AND ?) 
            AND employee_id IN (
                SELECT ET.employee_id 
                FROM employeeteam as ET
                WHERE ET.team_id =?);`,
            [start_date, end_date, team_id]);
    }

    /*getProjectActivitiesFromTeamBtw(team_id, start_date, end_date)
    Function respomsible for obtaining all project activities based on a team_id and
    a date range.*/

    static getProjectActivitiesFromTeamBtw(team_id, start_date, end_date){
        return db.execute( `
            SELECT A.title, A.description, A.completed_at, A.project_id, A.employee_id 
            FROM activity as A 
            INNER JOIN collaboration as C ON A.project_id=C.project_id
            WHERE C.project_id IN(
                SELECT PT.project_id 
                FROM projectteam as PT 
                WHERE PT.team_id = ? AND PT.joined_at>=? AND PT.joined_at<=?);`,
            [team_id, start_date, end_date]);
    }

    /*getEmployeeActivitiesFromProjBtw(project_id, start_date, end_date)
    Function responsible for obtaining all employee activities related to a project
    between a specific date range*/

    static getEmployeeActivitiesFromProjBtw(project_id, start_date, end_date){
        return db.execute(`
            SELECT DISTINCT A.title, A.description, A.completed_at, A.employee_id, A.project_id 
            FROM activity as A 
            INNER JOIN collaboration AS C ON A.project_id=C.project_id 
            WHERE (A.completed_at BETWEEN ? AND ?) 
            AND C.project_id =?;`,
            [start_date, end_date, project_id]);
    }

    /*getTeamActivitiesFromProjectBtw(project_id, start_date, end_date)
    Function responsible for obtaining all activities related to a project
    made by a team between a specific date range*/

    static getTeamActivitiesFromProjectBtw(project_id, start_date, end_date){
        return db.execute(`
            SELECT DISTINCT A.title, A.description, A.completed_at, A.project_id, A.employee_id 
            FROM activity as A 
            INNER JOIN projectteam AS PT ON PT.project_id=A.project_id 
            WHERE (A.completed_at BETWEEN ? AND ?) 
            AND PT.project_id=?;`,
            [start_date, end_date, project_id])
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
