// Project Model
// Project(project_id, employee_responsible_id, name, description, status, start_date, end_date, created_at)

const Status = {
    PLANNED: 'PLANNED',
    IN_PROGRESS: 'IN_PROGRESS',
    ON_HOLD: 'ON_HOLD',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

module.exports = class Project {

    constructor(project_id, employee_responsible_id, name, description, status, start_date, end_date, created_at) {
        this.project_id = project_id;
        this.employee_responsible_id = employee_responsible_id;
        this.name = name;
        this.description = description;
        this.status = status; // Status ENUM
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_at = created_at;
    }

    // Create or Update project
    save() {
        // TODO: Implement database logic
        // If project_id exists, update; otherwise, insert new record
    }

    // Read all projects
    static fetchAll() {
        // TODO: Implement database query to fetch all projects
    }

    // Read project by ID
    static fetchById(project_id) {
        // TODO: Implement database query to fetch project by ID
    }

    // Read projects by responsible employee
    static fetchByResponsible(employee_responsible_id) {
        // TODO: Implement database query to fetch projects by responsible employee
    }

    // Read projects by status
    static fetchByStatus(status) {
        // TODO: Implement database query to fetch projects by status
    }

    // Update project
    static update(project_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete project
    static delete(project_id) {
        // TODO: Implement database delete logic
    }

};

module.exports.Status = Status;
