// Prompt Model
// Prompt(prompt_id, name, description, type)

const ReportType = {
    EMPLOYEE: 'EMPLOYEE',
    TEAM: 'TEAM',
    PROJECT: 'PROJECT'
};

module.exports = class Prompt {

    constructor(prompt_id, name, description, type) {
        this.prompt_id = prompt_id;
        this.name = name;
        this.description = description;
        this.type = type; // ReportType ENUM
    }

    // Create or Update prompt
    save() {
        // TODO: Implement database logic
        // If prompt_id exists, update; otherwise, insert new record
    }

    // Read all prompts
    static fetchAll() {
        // TODO: Implement database query to fetch all prompts
    }

    // Read prompt by ID
    static fetchById(prompt_id) {
        // TODO: Implement database query to fetch prompt by ID
    }

    // Read prompts by type
    static fetchByType(type) {
        // TODO: Implement database query to fetch prompts by type
    }

    // Update prompt
    static update(prompt_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete prompt
    static delete(prompt_id) {
        // TODO: Implement database delete logic
    }

};

module.exports.ReportType = ReportType;
