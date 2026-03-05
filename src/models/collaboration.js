// Collaboration Model
// Collaboration(collaboration_id, project_id, employee_id, description, started_at, ended_at)

module.exports = class Collaboration {

    constructor(collaboration_id, project_id, employee_id, description, started_at, ended_at) {
        this.collaboration_id = collaboration_id;
        this.project_id = project_id;
        this.employee_id = employee_id;
        this.description = description;
        this.started_at = started_at;
        this.ended_at = ended_at;
    }

    // Create or Update collaboration
    save() {
        // TODO: Implement database logic
        // If collaboration_id exists, update; otherwise, insert new record
    }

    // Read all collaborations
    static fetchAll() {
        // TODO: Implement database query to fetch all collaborations
    }

    // Read collaboration by ID
    static fetchById(collaboration_id) {
        // TODO: Implement database query to fetch collaboration by ID
    }

    // Read collaborations by project
    static fetchByProject(project_id) {
        // TODO: Implement database query to fetch collaborations by project
    }

    // Read collaborations by employee
    static fetchByEmployee(employee_id) {
        // TODO: Implement database query to fetch collaborations by employee
    }

    // Update collaboration
    static update(collaboration_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete collaboration
    static delete(collaboration_id) {
        // TODO: Implement database delete logic
    }

};
