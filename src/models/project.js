// Project Model
// Project(project_id, employee_responsible_id, name, description, status, start_date, end_date, created_at)

const db = require('../utils/database.js');

const DEFAULT_DIRECTORY_SUGGESTION_LIMIT = '5';
// Treat project leads as members in directory-style queries even when no collaboration row exists yet.
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
        WHEN C.employee_id IS NOT NULL OR P.employee_responsible_id = ? THEN 1
        ELSE 0
    END AS is_member
FROM project AS P
INNER JOIN employee AS E
    ON E.employee_id = P.employee_responsible_id
LEFT JOIN collaboration AS C
    ON C.project_id = P.project_id
    AND C.employee_id = ?
    AND C.ended_at IS NULL
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
    CANCELLED: 'CANCELLED',
    DISABLED: 'DISABLED',
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

    save() {
        return db.execute(
            `INSERT INTO project(
                project_id,
                employee_responsible_id,
                name,
                description,
                status,
                start_date,
                end_date,
                created_at
            ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.employee_responsible_id,
                this.name,
                this.description,
                this.status,
                this.start_date,
                this.end_date,
                this.created_at,
            ],
        );
    }
    
    // Projects where the employee participates through collaboration
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
            WHERE P.status = 'IN PROGRESS'
                AND (
                    C.employee_id IS NOT NULL
                    OR P.employee_responsible_id = ?
                )
            ORDER BY P.name ASC;`,
            [employee_id, employee_id]
        );
    }

    // Projects where the employee does NOT participate through collaboration
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
            WHERE P.project_id NOT IN (
                SELECT project_id FROM collaboration WHERE employee_id = ? AND ended_at IS NULL
            )
            AND P.employee_responsible_id <> ?
            AND P.status = 'IN PROGRESS'
            ORDER BY P.name ASC;`,
            [employee_id, employee_id]
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

    /*getProjectsByTeamId(team_id)
    Function responsible for returning all projects related to a team
    whose id=team_id*/

    static getProjectsByTeamId(team_id){
        return db.execute('SELECT P.project_id, P.name, P.description, P.status, P.start_date, P.end_date, P.employee_responsible_id, E.full_name, PT.team_role FROM project as P INNER JOIN projectteam as PT ON PT.project_id=P.project_id INNER JOIN employee as E ON E.employee_id=P.employee_responsible_id WHERE PT.team_id=?;',
            [team_id]);
    }

    /*getProjectsByEmployeeId(employee_id)
    Function responsible for returning all projects related to an employee
    whose id=employee_id*/

    static getProjectByEmployeeId(employee_id){
        return db.execute(`
            SELECT
                P.project_id,
                P.name,
                P.description,
                P.status,
                P.start_date,
                P.end_date,
                P.employee_responsible_id,
                E.full_name,
                C.description AS coll_description,
                C.role AS coll_role,
                C.started_at,
                C.ended_at
            FROM project as P 
            -- Lead-owned projects do not always create a collaboration row at creation time.
            LEFT JOIN collaboration as C on P.project_id=C.project_id 
                AND C.employee_id=?
                AND C.ended_at IS NULL
            INNER JOIN employee as E ON P.employee_responsible_id=E.employee_id 
            WHERE (
                    C.employee_id IS NOT NULL
                    OR P.employee_responsible_id = ?
                )
                AND P.status <> ?;`,
            [employee_id, employee_id, Status.DISABLED]);
    };

    static findByName(name) {
        return db.execute(
            'SELECT project_id, name FROM project WHERE name = ?',
            [name],
        );
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

    /*update(project_id, name, description, status, start_date, end_date)
    Function responsible for updating the main project information shown in the details card popup.*/

    static update(project_id, name, description, status, start_date, end_date) {
        return db.execute(
            `UPDATE project
            SET
                name = ?,
                description = ?,
                status = ?,
                start_date = ?,
                end_date = ?
            WHERE project_id = ?`,
            [name, description, status, start_date, end_date, project_id],
        );
    }

    /*disableProject(project_id)
    Function responsible for soft deleting a project by marking it as disabled.*/

    static disableProject(project_id) {
        return db.execute(
            'UPDATE project SET status = ? WHERE project_id = ?',
            [Status.DISABLED, project_id],
        );
    }


    // ------------------------ Report Functions -----------------------

    /*getEmployeeProjectIDsBtw(employee_id, start_date, end_date)
    Function responsible for returning all project ids of projects related to an 
    employee btw the given date range.*/

    static getEmployeeProjectIDsBtw(employee_id, start_date, end_date){
        return db.execute(`
            SELECT P.project_id 
            FROM project as P 
            INNER JOIN collaboration AS C ON C.project_id=P.project_id 
            WHERE C.employee_id=? AND C.started_at>=? AND C.started_at<=?;`,
            [employee_id, start_date, end_date])
    }

    /*getTeamProjectIDsBtw(team_id, start_date, end_date)
    Fucntion responsible for returning all project ids of the projects related
    to the given team_id between the specified date range*/

    static getTeamProjectIDsBtw(team_id, start_date, end_date){
        return db.execute(`
            SELECT P.project_id 
            FROM project as P 
            INNER JOIN projectteam AS PT ON PT.project_id=P.project_id 
            WHERE PT.team_id=? AND PT.joined_at>=? AND PT.joined_at<=?;`,
            [team_id, start_date, end_date]);
    }


};

module.exports.Status = Status;
