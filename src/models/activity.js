// Activity Model
// Activity(activity_id, project_id, employee_id, entry_id, title, description, completed_at)

module.exports = class Activity {

    constructor(activity_id, project_id, employee_id, entry_id, title, description, completed_at) {
        this.activity_id = activity_id;
        this.project_id = project_id;
        this.employee_id = employee_id;
        this.entry_id = entry_id;
        this.title = title;
        this.description = description;
        this.completed_at = completed_at;
    }

    // Create or Update activity
    save() {
        // TODO: Implement database logic
        // If activity_id exists, update; otherwise, insert new record
    }

    // Read all activities
    static fetchAll() {
        // TODO: Implement database query to fetch all activities
    }

    // Read activity by ID
    static fetchById(activity_id) {
        // TODO: Implement database query to fetch activity by ID
    }

    // Read activities by project
    static fetchByProject(project_id) {
        // TODO: Implement database query to fetch activities by project
    }

    // Read activities by employee
    static fetchByEmployee(employee_id) {
        // TODO: Implement database query to fetch activities by employee
    }

    // Read activities by daily entry
    static fetchByEntry(entry_id) {
        // TODO: Implement database query to fetch activities by daily entry
    }

    // Update activity
    static update(activity_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete activity
    static delete(activity_id) {
        // TODO: Implement database delete logic
    }

};
