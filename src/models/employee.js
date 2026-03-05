// Employee Model
// Employee(employee_id, full_name, names, lastnames, timezone)

module.exports = class Employee {

    constructor(employee_id, full_name, names, lastnames, timezone) {
        this.employee_id = employee_id;
        this.full_name = full_name;
        this.names = names;
        this.lastnames = lastnames;
        this.timezone = timezone;
    }

    // Create or Update employee
    save() {
        // TODO: Implement database logic
        // If employee_id exists, update; otherwise, insert new record
    }

    // Read all employees
    static fetchAll() {
        // TODO: Implement database query to fetch all employees
    }

    // Read employee by ID
    static fetchById(employee_id) {
        // TODO: Implement database query to fetch employee by ID
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
