// RolePrivilege Model (Junction Table)
// RolePrivilege(role_id, privilege_id)

const db = require('../utils/database.js');

module.exports = class RolePrivilege {

    constructor(role_id, privilege_id) {
        this.role_id = role_id;
        this.privilege_id = privilege_id;
    }

    // Create or Update role-privilege assignment
    save() {
        // TODO: Implement database logic
        // If relationship exists, update; otherwise, insert new record
    }

    // Read all role-privilege assignments
    static fetchAll() {
        return db.execute('SELECT * FROM roleprivilege');
    }

    static deleteByRoleId(delete_role_id){
        return db.execute('DELETE FROM roleprivilege WHERE role_id=?',[delete_role_id]);
    }

    // Read assignments by role ID
    static fetchByRole(role_id) {
        // TODO: Implement database query to fetch all privileges for a role
    }

    // Read assignments by privilege ID
    static fetchByPrivilege(privilege_id) {
        // TODO: Implement database query to fetch all roles with a privilege
    }

    // Read specific assignment
    static fetchByRoleAndPrivilege(role_id, privilege_id) {
        // TODO: Implement database query to fetch specific assignment
    }

    // Update assignment
    static update(role_id, privilege_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete assignment
    static delete(role_id, privilege_id) {
        // TODO: Implement database delete logic
    }

};
