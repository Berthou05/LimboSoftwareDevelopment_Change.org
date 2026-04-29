// Employee Model
// Employee(employee_id, full_name, names, lastnames)

const db = require('../utils/database.js');

const DEFAULT_DIRECTORY_SUGGESTION_LIMIT = '5';
const LEAD_SCOPE_VISIBLE_EMPLOYEE_IDS_QUERY = `SELECT DISTINCT visible.employee_id
FROM (
    SELECT ET.employee_id
    FROM employeeteam AS ET
    WHERE ET.left_at IS NULL
        AND ET.team_id IN (
            SELECT T.team_id
            FROM team AS T
            LEFT JOIN employeeteam AS MyET
                ON MyET.team_id = T.team_id
                AND MyET.employee_id = ?
                AND MyET.left_at IS NULL
            WHERE T.status = 'ACTIVE'
                AND (
                    T.employee_responsible_id = ?
                    OR MyET.role = 'LEAD'
                )
        )
    UNION
    SELECT T.employee_responsible_id AS employee_id
    FROM team AS T
    LEFT JOIN employeeteam AS MyET
        ON MyET.team_id = T.team_id
        AND MyET.employee_id = ?
        AND MyET.left_at IS NULL
    WHERE T.status = 'ACTIVE'
        AND (
            T.employee_responsible_id = ?
            OR MyET.role = 'LEAD'
        )
) AS visible`;

const DIRECTORY_QUERY = `SELECT DISTINCT
    E.employee_id,
    E.full_name,
    A.slack_username,
    A.image,
    A.email
FROM employee AS E
INNER JOIN account AS A
    ON A.employee_id = E.employee_id
WHERE E.employee_id IN (${LEAD_SCOPE_VISIBLE_EMPLOYEE_IDS_QUERY})
    AND A.status = 'ACTIVE'
    AND (
        ? = ''
        OR E.full_name LIKE ?
        OR A.email LIKE ?
        OR A.slack_username LIKE ?
    )
ORDER BY E.full_name ASC`;

const buildLeadScopeParameters = function buildLeadScopeParameters(employeeId) {
    return [
        employeeId || '',
        employeeId || '',
        employeeId || '',
        employeeId || '',
    ];
};

const buildDirectoryQueryParameters = function buildDirectoryQueryParameters(employeeId, searchTerm) {
    const normalizedSearch = `%${searchTerm}%`;
    return [
        ...buildLeadScopeParameters(employeeId),
        searchTerm,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
    ];
};

module.exports = class Employee {

    constructor(fullname ,names, lastnames) {
        this.fullname = fullname;
        this.names = names;
        this.lastnames = lastnames;
    }

    /*save()
    Function responsible for storing an Employee object in database*/

    save() {
        return db.execute('INSERT INTO employee(employee_id, full_name, names, lastnames) VALUES(UUID(),?,?,?)',
                [this.fullname, this.names, this.lastnames]);
    }

    /* getEmployeeIdByFullname(fullname)
    Function responsible for obtaining an employee_id from full_name*/

    static getEmployeeIdByFullname(fullname){
        return db.execute('SELECT employee_id FROM employee WHERE full_name=?',
            [fullname]);
    }

    /* findByFullname(fullname)
    Function responsible for checking if an employee exists with the given full_name*/

    static findByFullname(fullname){
        return db.execute('SELECT employee_id, full_name FROM employee WHERE full_name=?',
            [fullname]);
    }

    /*getNamesByEmployeeId(employee_id)
    Function responsible for obtaining an Employee name(s) based on employee_id*/

    static getNamesByEmployeeId(employee_id){
        return db.execute('SELECT names FROM employee WHERE employee_id=?',[employee_id]);
    }

    /*fetchById(employee_id)
    Function responsible for returning all employee information based
    on employee_id*/

    static fetchById(employee_id) {
        return db.execute(`
            SELECT E.full_name, E.employee_id, A.slack_username, A.image, A.email, A.created_at
            FROM employee AS E 
            INNER JOIN account AS A ON E.employee_id=A.employee_id 
            WHERE E.employee_id=?`,
            [employee_id]);
    }

    static fetchNamePartsById(employee_id) {
        return db.execute('SELECT employee_id, full_name, names, lastnames FROM employee WHERE employee_id=?', [employee_id]);
    }

    static updateNames(employee_id, names, lastnames, full_name) {
        return db.execute(
            'UPDATE employee SET names=?, lastnames=?, full_name=? WHERE employee_id=?',
            [names, lastnames, full_name, employee_id]
        );
    }

    /*getEmployeeByTeamId(team_id)
    Function responsible for returning all employee information of the selected team
    whose id=team_id*/

    static getEmployeeByTeamId(team_id){
        return db.execute(
            `SELECT E.employee_id, E.full_name, ET.joined_at, ET.role 
            FROM employee as E 
            INNER JOIN employeeteam as ET ON E.employee_id=ET.employee_id 
            WHERE ET.team_id=? AND ET.left_at IS NULL 
            ORDER BY E.full_name ASC;`,
            [team_id]
        );
    };

    /*getNearEmployees(employee_id)
    Function responsible for returning all close employees to a LEAD or ADMIN*/

    static getNearEmployees(employee_id){
        return db.execute('SELECT E.full_name, E.employee_id,A.slack_username, A.image, A.email FROM employee as E INNER JOIN account AS A ON E.employee_id=A.employee_id INNER JOIN employeeteam as ET ON E.employee_id=ET.employee_id INNER JOIN team as T ON ET.team_id=T.team_id WHERE ET.team_id IN(SELECT T.team_id FROM team as T INNER JOIN employeeteam as ET ON ET.team_id=T.team_id WHERE ET.employee_id=? AND ET.role=?) UNION SELECT E.full_name, E.employee_id,A.slack_username, A.image, A.email FROM employee as E INNER JOIN account AS A ON E.employee_id=A.employee_id INNER JOIN collaboration as C ON C.employee_id=E.employee_id INNER JOIN project as P on C.project_id=P.project_id WHERE C.project_id IN(SELECT P.project_id FROM project as P WHERE P.employee_responsible_id=?);',
            [employee_id,'LEAD',employee_id]);
    }

    static searchDirectoryByLeadScope(employee_id, searchTerm = '') {
        return db.execute(
            DIRECTORY_QUERY,
            buildDirectoryQueryParameters(employee_id, searchTerm.trim()),
        );
    }

    static getDirectorySuggestionsByLeadScope(employee_id, searchTerm = '') {
        return db.execute(
            `${DIRECTORY_QUERY} LIMIT ?`,
            [
                ...buildDirectoryQueryParameters(employee_id, searchTerm.trim()),
                DEFAULT_DIRECTORY_SUGGESTION_LIMIT,
            ],
        );
    }

    static canViewInLeadScope(viewer_employee_id, target_employee_id) {
        return db.execute(
            `SELECT 1
            FROM (${LEAD_SCOPE_VISIBLE_EMPLOYEE_IDS_QUERY}) AS visible
            WHERE visible.employee_id = ?
            LIMIT 1`,
            [
                ...buildLeadScopeParameters(viewer_employee_id),
                target_employee_id,
            ],
        );
    }

    // ---------------- Report Functions ------------------------

    /*getEmployeeInfoFromTeam(team_id)
    Function responsible for obtaining the information of employees based on a team
    id*/

    static getEmployeeInfoFromTeam(team_id){
        return db.execute(`
            SELECT E.full_name, ET.role 
            FROM employee AS E 
            INNER JOIN employeeteam AS ET ON E.employee_id=ET.employee_id 
            WHERE ET.team_id=?;`,
            [team_id]);
    }

    /*getEmployeeInfoFromTeam(project_id, start_date, end_date)
    Function responsible for obtaining all employee information of collaborators
    in a project between the dates*/

    static getEmployeeInfoFromTeam(project_id, start_date, end_date){
        return db.execute(`
            SELECT E.full_name, C.description 
            FROM employee AS E 
            INNER JOIN collaboration AS C ON E.employee_id=C.employee_id 
            WHERE C.project_id=? AND C.started_at>=? 
            AND (C.ended_at<=? OR C.ended_at IS NULL);`,
            [project_id, start_date, end_date]);
    }


    //------------------------------------------------------------

    // Read all employees
    static fetchAll() {
        return db.execute('SELECT employee_id, full_name FROM employee ORDER BY full_name ASC');
    }

    // Update employee
    static update(employee_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete employee
    static delete(employee_id) {
        // TODO: Implement database delete logic
    }

};
