// Team Model
// Team(team_id, employee_responsible_id, name, description, created_at, image)

const db = require('../utils/database');

module.exports = class Team {
    constructor(team_id, employee_responsible_id, name, description, created_at, image) {
        this.team_id = team_id;
        this.employee_responsible_id = employee_responsible_id;
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.image = image;
    }

    static findAll() {
        return db.execute('SELECT * FROM teams');
    }

    static findById(team_id) {
        return db.execute('SELECT * FROM teams WHERE team_id = ?', [team_id]);
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
