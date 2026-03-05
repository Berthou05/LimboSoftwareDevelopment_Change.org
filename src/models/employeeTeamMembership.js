// EmployeeTeam Model (Junction Table)
// EmployeeTeam(employee_id, team_id, joined_at, left_at, role)

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

    // Create or Update employee-team membership
    save() {
        // TODO: Implement database logic
        // If relationship exists, update; otherwise, insert new record
    }

    // Read all employee-team memberships
    static fetchAll() {
        // TODO: Implement database query to fetch all memberships
    }

    // Read memberships by employee ID
    static fetchByEmployee(employee_id) {
        // TODO: Implement database query to fetch all teams for an employee
    }

    // Read memberships by team ID
    static fetchByTeam(team_id) {
        // TODO: Implement database query to fetch all employees in a team
    }

    // Read specific membership
    static fetchByEmployeeAndTeam(employee_id, team_id) {
        // TODO: Implement database query to fetch specific membership
    }

    // Update membership
    static update(employee_id, team_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete membership
    static delete(employee_id, team_id) {
        // TODO: Implement database delete logic
    }

};

module.exports.EmployeeRole = EmployeeRole;
