// Employee Model
// Employee(employee_id, full_name, names, lastnames)

const db = require('../utils/database.js');

module.exports = class Employee {

    constructor(fullname ,names, lastnames) {
        this.fullname = fullname;
        this.names = names;
        this.lastnames = lastnames;
    }

    // Create or Update employee
    save() {
        return db.execute('INSERT INTO employee(employee_id, full_name, names, lastnames) VALUES(UUID(),?,?,?)',
                [this.fullname, this.names, this.lastnames]);
    }

    static getEmployeeIdByFullname(fullname){
        return db.execute('SELECT employee_id FROM employee WHERE full_name=?',
            [fullname]);
    }

    static getNamesByEmployeeId(employee_id){
        return db.execute('SELECT names FROM employee WHERE employee_id=?',[employee_id]);
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
