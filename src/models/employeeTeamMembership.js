// EmployeeTeam Model (Junction Table)
// EmployeeTeam(employee_id, team_id, joined_at, left_at, role)

const db = require('../utils/database.js');

const EmployeeRole = {
    EMPLOYEE: 'EMPLOYEE',
    LEAD: 'LEAD'
};

module.exports = class EmployeeTeam {

    constructor(employee_id, team_id, joined_at, left_at, role) {
        this.employee_id = employee_id;
        this.team_id = team_id;
        this.joined_at = joined_at;
        this.left_at = left_at;
        this.role = role; // EmployeeRole ENUM
    }

    /*fetchTeamInfoByEmployee(employee_id)
    Function responsible for obtaining team and employeeteam information
    based on employee_id*/

    static fetchTeamInfoByEmployee(employee_id) {
        return db.execute('SELECT joined_at, role, T.name, T.description, T.image,T.employee_responsible_id, E.full_name  FROM employeeteam as ET INNER JOIN team as T ON T.team_id=ET.team_id INNER JOIN employee as E ON E.employee_id=T.employee_responsible_id WHERE ET.employee_id=?'
            ,[employee_id]);
    }

    // Create or Update employee-team membership
    save() {
        // TODO: Implement database logic
        // If relationship exists, update; otherwise, insert new record
    }

    // Read all employee-team memberships
    static fetchAll() {
        // TODO: Implement database query to fetch all memberships
    }

    // Read memberships by team ID
    static fetchByTeam(team_id) {
        // TODO: Implement database query to fetch all employees in a team
    }

    // Read specific membership
    static fetchByEmployeeAndTeam(employee_id, team_id) {
        return db.execute(
            'SELECT * FROM employeeteam WHERE employee_id=? AND team_id=?',
            [employee_id, team_id]
        );
    }

    // Update membership
    static update(employee_id, team_id, updateData) {
        return db.execute(
            'UPDATE employeeteam SET joined_at=?, left_at=?, role=? WHERE employee_id=? AND team_id=?',
            [
                updateData.joined_at,
                updateData.left_at,
                updateData.role,
                employee_id,
                team_id,
            ]
        );
    }

    // Delete membership
    static delete(employee_id, team_id) {
        // TODO: Implement database delete logic
    }

    static join(employee_id, team_id, joined_at = new Date(), role = EmployeeRole.EMPLOYEE) {
        return db.execute(
            'INSERT INTO employeeteam(employee_id, team_id, joined_at, left_at, role) VALUES(?,?,?,?,?)',
            [employee_id, team_id, joined_at, null, role]
        );
    }

    static leave(employee_id, team_id, left_at = new Date()) {
        return db.execute(
            'UPDATE employeeteam SET left_at=? WHERE employee_id=? AND team_id=?',
            [left_at, employee_id, team_id]
        );
    }

};

module.exports.EmployeeRole = EmployeeRole;
