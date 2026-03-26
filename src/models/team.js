// Team Model
// Team(team_id, employee_responsible_id, name, description, created_at, image)

const db = require('../utils/database');

const DEFAULT_DIRECTORY_SUGGESTION_LIMIT = 5;
const DIRECTORY_QUERY = `SELECT
    T.team_id,
    T.name,
    T.description,
    T.image,
    T.status,
    E.full_name AS lead_name,
    CASE
        WHEN ET.employee_id IS NULL THEN 0
        ELSE 1
    END AS is_member
FROM team AS T
INNER JOIN employee AS E
    ON E.employee_id = T.employee_responsible_id
LEFT JOIN employeeteam AS ET
    ON ET.team_id = T.team_id
    AND ET.employee_id = ?
    AND ET.left_at IS NULL
WHERE T.status = 'ACTIVE'
    AND (
        ? = ''
        OR T.name LIKE ?
        OR T.description LIKE ?
        OR E.full_name LIKE ?
    )
ORDER BY is_member DESC, T.name ASC`;

const buildDirectoryQueryParameters = function buildDirectoryQueryParameters(employeeId, searchTerm) {
    const normalizedSearch = `%${searchTerm}%`;

    return [
        employeeId || '',
        searchTerm,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
    ];
};

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
        return db.execute('SELECT * FROM team');
    }

    /*findById(team_id)
    Function responsible for returning the information of a specific tuple
    based on team_id*/

    static findById(team_id) {
        return db.execute('SELECT * FROM team WHERE team_id = ?', [team_id]);
    }

    /*fetchByEmployeeId(employee_id)
    Function responsible for returning all teams an employee is part of*/

    static fetchByEmployeeId(employee_id){
        return db.execute('SELECT * FROM team as T INNER JOIN employeeteam AS ET ON T.team_id=ET.team_id WHERE ET.employee_id=?;',
            [employee_id]);
    }

    /*fetchNotByEmployeeId(employee_id)
    Function responsible for returning all teams an employee is not part of*/

    static fetchNotByEmployeeId(employee_id){
        return db.execute('SELECT DISTINCT T.team_id, T.name, T.image, T.description,E.full_name FROM team as T INNER JOIN employeeteam as ET ON T.team_id=ET.team_id INNER JOIN employee as E ON T.employee_responsible_id=E.employee_id WHERE T.team_id NOT IN (SELECT T.team_id FROM team as T INNER JOIN employeeteam as ET ON T.team_id=ET.team_id WHERE ET.employee_id=?)',
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
