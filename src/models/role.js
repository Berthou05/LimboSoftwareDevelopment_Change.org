// Role Model
// Role(role_id, name)

const db = require('../utils/database.js');

module.exports = class Role {

    constructor(role_id, name) {
        this.role_id = role_id;
        this.name = name;
    }

    /*fetchAll()
    Function responsible for obtaining all available Roles in the table*/

    static fetchAll() {
        return db.execute('SELECT * FROM role');
    }

    /*deleteByRoleId(delete_role_id)
    Function responsible for a Role deletion based on role_id*/
    
    static delete(delete_role_id){
        return db.execute('DELETE FROM roles WHERE role_id=?',[delete_role_id]);
    }



    // Create or Update role
    save() {
        // TODO: Implement database logic
        // If role_id exists, update; otherwise, insert new record
    }

    // Read role by ID
    static fetchById(role_id) {
        // TODO: Implement database query to fetch role by ID
    }

    // Read role by name
    static fetchByName(name) {
        // TODO: Implement database query to fetch role by name
    }

    // Update role
    static update(role_id, updateData) {
        // TODO: Implement database update logic
    }


};
