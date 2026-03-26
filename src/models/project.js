// Project Model
// Project(project_id, employee_responsible_id, name, description, status, start_date, end_date, created_at)

const db = require('../utils/database.js');

const DEFAULT_DIRECTORY_SUGGESTION_LIMIT = 5;
const DIRECTORY_QUERY = `SELECT DISTINCT
    P.project_id,
    P.name,
    NULL AS image,
    P.description,
    P.status,
    P.start_date,
    P.end_date,
    E.full_name AS lead_name,
    CASE
        WHEN (
            C.employee_id IS NOT NULL
            OR P.employee_responsible_id = ?
            OR ET.employee_id IS NOT NULL
        ) THEN 1
        ELSE 0
    END AS is_member
FROM project AS P
INNER JOIN employee AS E
    ON E.employee_id = P.employee_responsible_id
LEFT JOIN collaboration AS C
    ON C.project_id = P.project_id
    AND C.employee_id = ?
    AND C.ended_at IS NULL
LEFT JOIN projectteam AS PT
    ON PT.project_id = P.project_id
LEFT JOIN employeeteam AS ET
    ON ET.team_id = PT.team_id
    AND ET.employee_id = ?
    AND ET.left_at IS NULL
WHERE P.status = 'IN PROGRESS'
    AND (
        ? = ''
        OR P.name LIKE ?
        OR P.description LIKE ?
        OR E.full_name LIKE ?
    )
ORDER BY is_member DESC, P.name ASC`;

const buildDirectoryQueryParameters = function buildDirectoryQueryParameters(employeeId, searchTerm) {
    const normalizedSearch = `%${searchTerm}%`;
    return [
        employeeId || '',
        employeeId || '',
        employeeId || '',
        searchTerm,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
    ];
};

const Status = {
    PLANNED: 'PLANNED',
    IN_PROGRESS: 'IN PROGRESS',
    ON_HOLD: 'ON HOLD',
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
    
    // Projects where the employee participates (direct, responsible, or via team)
    static fetchByEmployeeId(employee_id) {
        return db.execute(
            `SELECT DISTINCT
                P.project_id,
                P.name,
                NULL AS image,
                P.description,
                P.status,
                P.start_date,
                P.end_date,
                E.full_name AS lead_name,
                1 AS is_member
            FROM project AS P
            INNER JOIN employee AS E ON P.employee_responsible_id = E.employee_id
            LEFT JOIN collaboration AS C
                ON C.project_id = P.project_id
                AND C.employee_id = ?
                AND C.ended_at IS NULL
            LEFT JOIN projectteam AS PT ON PT.project_id = P.project_id
            LEFT JOIN employeeteam AS ET ON ET.team_id = PT.team_id AND ET.employee_id = ? AND (ET.left_at IS NULL)
            WHERE (
                C.employee_id IS NOT NULL
                OR P.employee_responsible_id = ?
                OR ET.employee_id IS NOT NULL
            )
            AND P.status = 'IN PROGRESS'
            ORDER BY P.name ASC;`,
            [employee_id, employee_id, employee_id]
        );
    }

    // Projects where the employee does NOT participate (not direct, not responsible, not via team)
    static fetchNotByEmployeeId(employee_id) {
        return db.execute(
            `SELECT DISTINCT
                P.project_id,
                P.name,
                NULL AS image,
                P.description,
                P.status,
                P.start_date,
                P.end_date,
                E.full_name AS lead_name,
                0 AS is_member
            FROM project AS P
            INNER JOIN employee AS E ON P.employee_responsible_id = E.employee_id
            LEFT JOIN projectteam AS PT ON PT.project_id = P.project_id
            LEFT JOIN employeeteam AS ET ON ET.team_id = PT.team_id AND ET.employee_id = ? AND (ET.left_at IS NULL)
            WHERE P.project_id NOT IN (
                SELECT project_id FROM collaboration WHERE employee_id = ? AND ended_at IS NULL
                UNION
                SELECT project_id FROM project AS P2 WHERE P2.employee_responsible_id = ?
                UNION
                SELECT PT2.project_id FROM projectteam AS PT2
                INNER JOIN employeeteam AS ET2 ON ET2.team_id = PT2.team_id AND ET2.employee_id = ? AND (ET2.left_at IS NULL)
            )
            AND P.status = 'IN PROGRESS'
            ORDER BY P.name ASC;`,
            [employee_id, employee_id, employee_id, employee_id]
        );
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

    // (Removed duplicate fetchByEmployeeId)

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
    static findById(project_id) {
        return db.execute(
            `SELECT
                P.project_id,
                P.employee_responsible_id,
                P.name,
                P.description,
                P.status,
                P.start_date,
                P.end_date,
                P.created_at,
                NULL AS image,
                E.full_name AS lead_name
            FROM project AS P
            INNER JOIN employee AS E
                ON E.employee_id = P.employee_responsible_id
            WHERE P.project_id = ?`,
            [project_id],
        );
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
