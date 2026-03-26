// Employee Model
// Employee(employee_id, full_name, names, lastnames)

const db = require('../utils/database.js');

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

    /*getNamesByEmployeeId(employee_id)
    Function responsible for obtaining an Employee name(s) based on employee_id*/

    static getNamesByEmployeeId(employee_id){
        return db.execute('SELECT names FROM employee WHERE employee_id=?',[employee_id]);
    }

    /*fetchById(employee_id)
    Function responsible for returning all employee information based
    on employee_id*/

    static fetchById(employee_id) {
        return db.execute('SELECT * FROM employee WHERE employee_id=?',[employee_id]);
    }

    /*getEmployeeByTeamId(team_id)
    Function responsible for returning all employee information of the selected team
    whose id=team_id*/

    static getEmployeeByTeamId(team_id){
        return db.execute('SELECT E.employee_id, E.full_name, ET.joined_at, ET.role FROM employee as E INNER JOIN employeeteam as ET ON E.employee_id=ET.employee_id WHERE ET.team_id=? AND ET.left_at IS NULL;',[team_id]);
    };



    // Read all employees
    static fetchAll() {
        // TODO: Implement database query to fetch all employees
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
