// Role Model
// Role(role_id, name)

const db = require('../utils/database.js');

module.exports = class Role {

    constructor(name) {
        this.name = name;
    }

    /*save()
    Function responsible for saving a Role object into database*/
    
    save() {
        return db.execute('INSERT INTO role(role_id, name) VALUES(UUID(),?)',[this.name]);
    }

    /*fetchAllWithPrivileges()
    Function responsible for obtaining all available Roles in the table and their privileges*/

    static fetchAllWithPrivileges() {
        return db.execute(`
            SELECT R.role_id, R.name, RP.privilege_id
            FROM role AS R
            LEFT JOIN roleprivilege AS RP ON RP.role_id=R.role_id;`);
    }

    /*deleteByRoleId(delete_role_id)
    Function responsible for a Role deletion based on role_id*/
    
    static delete(delete_role_id){
        return db.execute('DELETE FROM role WHERE role_id=?',[delete_role_id]);
    }

    static fetchAll(){
        return db.execute('SELECT * FROM role');
    }
    
    static fetchNameById(role_id){
        return db.execute(`
            SELECT R.name
            FROM role as R
            WHERE R.role_id=?;`,
            [role_id]);
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
