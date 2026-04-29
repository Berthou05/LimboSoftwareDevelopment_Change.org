// Activity Model
// Activity(activity_id, project_id, employee_id, entry_id, title, description, completed_at)

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
    A.activity_id,
    A.project_id,
    A.team_id,
    A.employee_id,
    A.title,
    A.description,
    A.completed_at,
    E.full_name,
    P.name AS project_name,
    T.name AS team_name,
    CASE
        WHEN A.employee_id = ? THEN 1
        ELSE 0
    END AS is_owner
FROM activity AS A
INNER JOIN employee AS E
    ON E.employee_id = A.employee_id
LEFT JOIN project AS P
    ON P.project_id = A.project_id
LEFT JOIN team AS T
    ON T.team_id = A.team_id
WHERE A.employee_id IN (${LEAD_SCOPE_VISIBLE_EMPLOYEE_IDS_QUERY})
    AND (
        ? = ''
        OR A.title LIKE ?
        OR A.description LIKE ?
        OR E.full_name LIKE ?
        OR COALESCE(P.name, '') LIKE ?
        OR COALESCE(T.name, '') LIKE ?
    )
ORDER BY is_owner DESC, A.completed_at DESC, A.title ASC`;

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
        employeeId || '',
        ...buildLeadScopeParameters(employeeId),
        searchTerm,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
        normalizedSearch,
    ];
};

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

    /*create(entry_id, employee_id, team_id, project_id, title, description, completed_at)
    Function responsible for storing a generated activity linked to a
    daily entry.*/

    static create(entry_id, employee_id, team_id, project_id, title, description, completed_at = null) {
        return db.execute(
            `INSERT INTO activity(
                activity_id,
                project_id,
                team_id,
                employee_id,
                entry_id,
                title,
                description,
                completed_at
            ) VALUES(UUID(), ?, ?, ?, ?, ?, ?, ?)`,
            [
                project_id || null,
                team_id,
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
        // Team activity must follow the activity's recorded team, not every team the author belongs to.
        const conditions = ['A.team_id=?'];
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
            INNER JOIN employeeteam as ET ON ET.employee_id=E.employee_id AND ET.team_id=A.team_id 
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
            SELECT A.activity_id, A.project_id, A.title, A.description, A.completed_at, E.full_name, P.name AS project_name
            FROM activity as A 
            INNER JOIN employee AS E ON E.employee_id=A.employee_id 
            LEFT JOIN project AS P ON P.project_id = A.project_id
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

//-------------- Report Queries--------------------

    /*getProjectActivities(project_ids, start_date, end_date)
    Function responsible for returning all project information
    related to the project_ids passed as a parameter.*/

static getProjectActivities(project_ids, start_date, end_date) {
    if (project_ids.length === 0) {
        return Promise.resolve([[]]);
    }

    const hasNull = project_ids.includes(null);
    const validIds = project_ids.filter(id => id !== null);

    let conditions = [];
    let params = [start_date, end_date];

    if (validIds.length > 0) {
        const placeholders = validIds.map(() => '?').join(',');
        conditions.push(`project_id IN (${placeholders})`);
        params.push(...validIds);
    }

    if (hasNull) {
        conditions.push(`project_id IS NULL`);
    }

    return db.execute(`
        SELECT A.title, A.description, A.completed_at, A.employee_id AS e, A.team_id AS t, A.project_id AS p,E.full_name
        FROM activity AS A
        INNER JOIN employee AS E ON A.employee_id = E.employee_id 
        WHERE (completed_at BETWEEN ? AND ?)
        AND (${conditions.join(' OR ')})
        ORDER BY A.completed_at ASC;
    `, params);
}
    /*getNullProjectActivities(employee_id, start_date, end_date)
    Function that returns the general activities of the employee between a date range*/  
    static getNullProjectActivities(employee_id, start_date, end_date){
        return db.execute(`
            SELECT A.activity_id
            FROM activity AS A
            WHERE A.employee_id=? AND A.project_id IS NULL AND (completed_at BETWEEN ? AND ?);
            `,[employee_id,start_date, end_date]);
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
        return db.execute(
            `SELECT activity_id, project_id, employee_id
            FROM activity
            WHERE activity_id = ?
            LIMIT 1`,
            [activity_id],
        );
    }

    // Read activities by daily entry
    static fetchByEntry(entry_id) {
        // TODO: Implement database query to fetch activities by daily entry
    }

    // Update activity
    static update(activity_id, updateData) {
        return db.execute(
            `UPDATE activity
            SET project_id = ?
            WHERE activity_id = ?
                AND employee_id = ?`,
            [
                Object.prototype.hasOwnProperty.call(updateData, 'project_id')
                    ? updateData.project_id
                    : null,
                activity_id,
                updateData.employee_id,
            ],
        );
    }

    // Delete activity
    static delete(activity_id) {
        // TODO: Implement database delete logic
    }

};
