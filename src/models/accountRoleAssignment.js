// AccountRole Model (Junction Table)
// AccountRole(account_id, role_id)

const db = require('../utils/database.js');

module.exports = class AccountRole {

    constructor(account_id, role_id) {
        this.account_id = account_id;
        this.role_id = role_id;
    }

    /*save()
    Function responsible for storing an AccountRole object into database*/

    save() {
        return db.execute('INSERT INTO accountrole(account_id, role_id) VALUES (?,?)',
            [this.account_id, this.role_id]);
    }

    /*updateByRole(delete_role_id)
    Function responsible for updating all AccountRole tuples that contain
    delete_role_id by substituting it with ROLE_ID*/

    static updateByRole(delete_role_id){
        //* Role of the ID for which the User will be changed to.
        const ROLE_ID='role-001';
        return db.execute('UPDATE accountrole SET role_id=? WHERE role_id=? values(?,?)'[ROLE_ID, delete_role_id]);
    }


    
    // Read all account-role assignments
    static fetchAll() {
        // TODO: Implement database query to fetch all assignments
    }

    // Read assignments by account ID
    static fetchByAccount(account_id) {
        // TODO: Implement database query to fetch all roles for an account
    }

    /*hasRoleByEmployeeId(employee_id, role_name)
    Function responsible for validating if an employee has a specific role.*/

    static hasRoleByEmployeeId(employee_id, role_name) {
        return db.execute(
            `SELECT
                AR.account_id,
                AR.role_id
            FROM accountrole AS AR
            INNER JOIN account AS A
                ON A.account_id = AR.account_id
            INNER JOIN role AS R
                ON R.role_id = AR.role_id
            WHERE A.employee_id = ?
                AND R.name = ?
            LIMIT 1`,
            [employee_id, role_name],
        ).then(([rows]) => rows.length > 0);
    }

    // Read assignments by role ID
    static fetchByRole(role_id) {
        // TODO: Implement database query to fetch all accounts with a role
    }

    // Read specific assignment
    static fetchByAccountAndRole(account_id, role_id) {
        // TODO: Implement database query to fetch specific assignment
    }

    // Update assignment
    static update(account_id, role_id) {
        // TODO: Implement database update logic
    }

    // Delete assignment
    static delete(account_id, role_id) {
        // TODO: Implement database delete logic
    }

};
