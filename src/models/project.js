// Project Model
// Project(project_id, employee_responsible_id, name, description, status, start_date, end_date, created_at)

const db = require('../utils/database.js');

const Status = {
    PLANNED: 'PLANNED',
    IN_PROGRESS: 'IN_PROGRESS',
    ON_HOLD: 'ON_HOLD',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

module.exports = class Project {

    constructor(project_id, employee_responsible_id, name, description, status, start_date, end_date, created_at) {
        this.project_id = project_id;
        this.employee_responsible_id = employee_responsible_id;
        this.name = name;
        this.description = description;
        this.status = status; // Status ENUM
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_at = created_at;
    }

    /*getEmployeeProjectsInfoBtw(employee_id, start_date, end_date)
    Function responsible for obtaining all projects information 
    where an employee whose id=employee_id between the provided date
    range.*/

    static getEmployeeProjectsInfoBtw(employee_id, start_date, end_date){
        return db.execute('SELECT P.name, P.description, P.status, P.start_date, P.end_date FROM project as P INNER JOIN collaboration as C ON C.project_id=P.project_id WHERE C.employee_id=? AND C.started_at>=? AND (C.ended_at<=? OR C.ended_at IS NULL);',
            [employee_id, start_date, end_date]);
    }

    /*getProjectsByTeamId(team_id)
    Function responsible for returning all projects related to a team
    whose id=team_id*/

    static getProjectsByTeamId(team_id){
        return db.execute('SELECT P.project_id, P.name, P.description, P.status, P.start_date, p.end_date, p.employee_responsible_id, E.full_name, PT.team_role FROM project as P INNER JOIN projectteam as PT ON PT.project_id=P.project_id INNER JOIN employee as E ON E.employee_id=P.employee_responsible_id WHERE PT.team_id=?;',
            [team_id]);
    }

    /*getProjectByEmployeeId(employee_id)
    Function responsible for returning all projects related to an employee*/

    static getProjectByEmployeeId(employee_id){
        return db.execute('SELECT P.project_id, P.name, P.description, P.status, p.start_date, p.end_date, p.employee_responsible_id,E.full_name,C.description,C.started_at,C.ended_at FROM project as P INNER JOIN collaboration as C on P.project_id=C.project_id INNER JOIN employee as E ON P.employee_responsible_id=E.employee_id WHERE C.employee_id=?;',
            [employee_id]);
    };

    // Create or Update project
    save() {
        // TODO: Implement database logic
        // If project_id exists, update; otherwise, insert new record
    }

    // Read all projects
    static fetchAll() {
        // TODO: Implement database query to fetch all projects
    }

    // Read project by ID
    static fetchById(project_id) {
        // TODO: Implement database query to fetch project by ID
    }

    // Read projects by responsible employee
    static fetchByResponsible(employee_responsible_id) {
        // TODO: Implement database query to fetch projects by responsible employee
    }

    // Read projects by status
    static fetchByStatus(status) {
        // TODO: Implement database query to fetch projects by status
    }

    // Update project
    static update(project_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete project
    static delete(project_id) {
        // TODO: Implement database delete logic
    }

};

module.exports.Status = Status;
