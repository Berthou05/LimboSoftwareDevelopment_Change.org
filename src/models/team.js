// Team Model
// Team(team_id, employee_responsible_id, name, description, created_at, image)

const db = require('../utils/database');

const Status = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
};

module.exports = class Team {
    constructor(team_id, employee_responsible_id, name, description, created_at, image, status = Status.ACTIVE) {
        this.team_id = team_id;
        this.employee_responsible_id = employee_responsible_id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.image = image;
        this.status = status;
    }

    /*findAll()
    Function responsible for returning all existent Teams*/

    static findAll() {
        return db.execute('SELECT * FROM team');
    }

    /*findById(team_id)
    Function responsible for returning the information of a specific tuple
    based on team_id*/

    static findById(team_id) {
        return db.execute('SELECT * FROM team WHERE team_id = ?', [team_id]);
    }

    /*findByName(name)
    Function responsible for returning a team with the same name.*/

    static findByName(name) {
        return db.execute(
            'SELECT team_id, name FROM team WHERE name = ?',
            [name],
        );
    }

    /*fetchByEmployeeId(employee_id)
    Function responsible for returning all teams an employee is part of*/

    static fetchByEmployeeId(employee_id){
        return db.execute('SELECT * FROM team as T INNER JOIN employeeteam AS ET ON T.team_id=ET.team_id WHERE ET.employee_id=? AND ET.left_at IS NULL;',
            [employee_id]);
    }

    /*fetchNotByEmployeeId(employee_id)
    Function responsible for returning all teams an employee is not part of*/

    static fetchNotByEmployeeId(employee_id){
        return db.execute('SELECT DISTINCT T.team_id, T.name, T.image, T.description,E.full_name FROM team as T INNER JOIN employeeteam as ET ON T.team_id=ET.team_id INNER JOIN employee as E ON T.employee_responsible_id=E.employee_id WHERE T.team_id NOT IN (SELECT T.team_id FROM team as T INNER JOIN employeeteam as ET ON T.team_id=ET.team_id WHERE ET.employee_id=? AND ET.left_at IS NULL)',
            [employee_id]);
    }

    /*getEmployeeTeamsInfoBtw(employee_id, start_date, end_date)
    Function responsible for obtaining all team information based on an
    employee_id and a date range*/

    static getEmployeeTeamsInfoBtw(employee_id, start_date, end_date){
        return db.execute('SELECT name, description FROM team AS T INNER JOIN employeeteam as ET ON ET.team_id=T.team_id WHERE ET.employee_id=? AND ET.joined_at >= ? AND (ET.left_at <= ? OR ET.left_at IS NULL);',
            [employee_id, start_date, end_date]);
    }

    // Create or Update team
    save() {
        return db.execute(
            `INSERT INTO team(
                team_id,
                employee_responsible_id,
                name,
                description,
                created_at,
                image,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                this.team_id,
                this.employee_responsible_id,
                this.name,
                this.description,
                this.created_at,
                this.image,
                this.status,
            ],
        );
    }

    // Read all teams
    static fetchAll() {
        // TODO: Implement database query to fetch all teams
    }

    // Read teams by responsible employee
    static fetchByResponsible(employee_responsible_id) {
        // TODO: Implement database query to fetch teams by responsible employee
    }

    // Update team
    static update(team_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete team
    static delete(team_id) {
        // TODO: Implement database delete logic
    }

};

module.exports.Status = Status;
