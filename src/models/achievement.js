// Achievement Model
// Achievement(achievement_id, project_id, employee_responsible_id, title, description, achievement_date, evidence_link)

module.exports = class Achievement {

    constructor(achievement_id, project_id, employee_responsible_id, title, description, achievement_date, evidence_link) {
        this.achievement_id = achievement_id;
        this.project_id = project_id;
        this.employee_responsible_id = employee_responsible_id;
        this.title = title;
        this.description = description;
        this.achievement_date = achievement_date;
        this.evidence_link = evidence_link;
    }

    // Create or Update achievement
    save() {
        // TODO: Implement database logic
        // If achievement_id exists, update; otherwise, insert new record
    }

    // Read all achievements
    static fetchAll() {
        // TODO: Implement database query to fetch all achievements
    }

    // Read achievement by ID
    static fetchById(achievement_id) {
        // TODO: Implement database query to fetch achievement by ID
    }

    // Read achievements by project
    static fetchByProject(project_id) {
        // TODO: Implement database query to fetch achievements by project
    }

    // Read achievements by responsible employee
    static fetchByResponsible(employee_responsible_id) {
        // TODO: Implement database query to fetch achievements by responsible employee
    }

    // Update achievement
    static update(achievement_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete achievement
    static delete(achievement_id) {
        // TODO: Implement database delete logic
    }

};
