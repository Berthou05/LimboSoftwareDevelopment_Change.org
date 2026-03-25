// Team Model
// Team(team_id, employee_responsible_id, name, description, created_at, image)

const db = require('../util/database');

module.exports = class Team {
    constructor(team_id, employee_responsible_id, name, description, created_at, image) {
        this.team_id = team_id;
        this.employee_responsible_id = employee_responsible_id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.image = image;
    }

    /*findAll()
    Function responsible for returning all existent Teams*/

    static findAll() {
        return db.execute('SELECT * FROM teams');
    }

    /*findById(team_id)
    Function responsible for returning the information of a specific tuple
    based on team_id*/

    static findById(team_id) {
        return db.execute('SELECT * FROM teams WHERE team_id = ?', [team_id]);
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
        // TODO: Implement database logic
        // If team_id exists, update; otherwise, insert new record
    }

    // Read all teams
    static fetchAll() {
        // TODO: Implement database query to fetch all teams
    }

    // Read team by ID
    static fetchById(team_id) {
        // TODO: Implement database query to fetch team by ID
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
