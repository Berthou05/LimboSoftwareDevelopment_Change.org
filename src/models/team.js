// Team Model
// Team(team_id, employee_responsible_id, name, description, created_at, image)

const db = require('../utils/database');

const Status = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED'
};

const DEFAULT_DIRECTORY_SUGGESTION_LIMIT = '5';
const DIRECTORY_QUERY = `SELECT DISTINCT
    T.team_id,
    T.name,
    T.image,
    T.description,
    E.full_name,
    CASE
        WHEN ET.employee_id IS NOT NULL OR T.employee_responsible_id = ? THEN 1
        ELSE 0
    END AS is_member
FROM team AS T
INNER JOIN employee AS E
    ON E.employee_id = T.employee_responsible_id
LEFT JOIN employeeteam AS ET
    ON ET.team_id = T.team_id
    AND ET.employee_id = ?
    AND ET.left_at IS NULL
WHERE (
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
        employeeId || '',
        searchTerm,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
    ];
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

    /*findAll()
    Function responsible for returning all active teams.*/

    static findAll() {
        return db.execute('SELECT * FROM team WHERE status = ?', [Status.ACTIVE]);
    }

    /*findById(team_id)
    Function responsible for returning the information of a specific tuple
    based on team_id*/

    static findById(team_id) {
        return db.execute(`
            SELECT * ,E.full_name
            FROM team as T 
            INNER JOIN employee AS E ON E.employee_id=T.employee_responsible_id
            WHERE team_id = ?`, 
            [team_id]);
    }

    /*disableTeam(team_id)
    Function responsible for soft deleting a team by marking it as disabled.*/

    static disableTeam(team_id) {
        return db.execute(
            'UPDATE team SET status = ? WHERE team_id = ?',
            [Status.DISABLED, team_id],
        );
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
        return db.execute('SELECT * FROM team as T INNER JOIN employeeteam AS ET ON T.team_id=ET.team_id WHERE ET.employee_id=? AND ET.left_at IS NULL AND T.status=?;',
            [employee_id, Status.ACTIVE]);
    }

    /*fetchNotByEmployeeId(employee_id)
    Function responsible for returning all active teams an employee is not part of*/

    static fetchNotByEmployeeId(employee_id){
        return db.execute('SELECT DISTINCT T.team_id, T.name, T.image, T.description,E.full_name FROM team as T INNER JOIN employeeteam as ET ON T.team_id=ET.team_id INNER JOIN employee as E ON T.employee_responsible_id=E.employee_id WHERE T.status=? AND T.team_id NOT IN (SELECT T.team_id FROM team as T INNER JOIN employeeteam as ET ON T.team_id=ET.team_id WHERE ET.employee_id=? AND ET.left_at IS NULL)',
            [Status.ACTIVE, employee_id]);
    }

    static searchDirectory(employee_id, searchTerm = '') {
        return db.execute(
            DIRECTORY_QUERY,
            buildDirectoryQueryParameters(employee_id, searchTerm.trim()),
        );
    }

    static getDirectorySuggestions(employee_id, searchTerm = '') {
        return db.execute(
            `${DIRECTORY_QUERY} LIMIT ?`,
            [
                ...buildDirectoryQueryParameters(employee_id, searchTerm.trim()),
                DEFAULT_DIRECTORY_SUGGESTION_LIMIT,
            ],
        );
    }

    // -------------------- Report Functions -------------------------------

    /*getEmployeeTeamsInfoBtw(employee_id, start_date, end_date)
    Function responsible for obtaining all active team information based on an
    employee_id and a date range*/

    static getEmployeeTeamsInfoBtw(employee_id, start_date, end_date){
        return db.execute(`
            SELECT name, description 
            FROM team AS T 
            INNER JOIN employeeteam as ET ON ET.team_id=T.team_id 
            WHERE T.status=? AND ET.employee_id=? 
            AND ET.joined_at >= ? 
            AND (ET.left_at <= ? OR ET.left_at IS NULL);`,
            [Status.ACTIVE, employee_id, start_date, end_date]);
    }

    /*getTeamInfoFromProj(project_id, start_date, end_date)
    Function responsible for obtaining all team information of teams
    assigned to a project between a specified date range*/

    static getTeamInfoFromProj(project_id, start_date, end_date){
        return db.execute(`
            SELECT T.name, T.description 
            FROM team AS T 
            INNER JOIN projectteam as PT ON T.team_id=PT.team_id 
            WHERE PT.project_id=? AND PT.joined_at>=? AND PT.joined_at<=?;`,
            [project_id, start_date, end_date])
    }


    //-----------------------------------------------------------------------

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
