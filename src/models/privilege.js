// Privilege Model
// Privilege(privilege_id, name, description)

const db = require('../utils/database.js');

module.exports = class Privilege {

    constructor(privilege_id, name, description) {
        this.privilege_id = privilege_id;
        this.name = name;
        this.description = description;
    }

    /*fetchAll()
    Function responsible for obtaining all available Privilege in the table*/

    static fetchAll() {
        return db.execute(`
            SELECT * FROM privilege
            WHERE privilege_id NOT LIKE '%ADMIN%';`);
    }

    
    // Create or Update privilege
    save() {
        // TODO: Implement database logic
        // If privilege_id exists, update; otherwise, insert new record
    }

    // Read privilege by ID
    static fetchById(privilege_id) {
        // TODO: Implement database query to fetch privilege by ID
    }

    // Read privilege by name
    static fetchByName(name) {
        // TODO: Implement database query to fetch privilege by name
    }

    // Update privilege
    static update(privilege_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete privilege
    static delete(privilege_id) {
        // TODO: Implement database delete logic
    }

};
