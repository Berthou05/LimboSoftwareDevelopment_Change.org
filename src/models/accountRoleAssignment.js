// AccountRole Model (Junction Table)
// AccountRole(account_id, role_id)

const db = require('../utils/database.js');

module.exports = class AccountRole {

    constructor(account_id, role_id) {
        this.account_id = account_id;
        this.role_id = role_id;
    }

    // Create or Update account-role assignment
    save() {
        return db.execute('INSERT INTO accountrole(account_id, role_id) VALUES (?,?)',
            [this.account_id, this.role_id]);
    }

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
