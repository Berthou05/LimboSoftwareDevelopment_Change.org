// DailyEntry Model
// DailyEntry(entry_id, employee_id, entry_date, to_do, done, blockers, slack_standup_URL)

module.exports = class DailyEntry {

    constructor(entry_id, employee_id, entry_date, to_do, done, blockers, slack_standup_URL) {
        this.entry_id = entry_id;
        this.employee_id = employee_id;
        this.entry_date = entry_date;
        this.to_do = to_do;
        this.done = done;
        this.blockers = blockers;
        this.slack_standup_URL = slack_standup_URL;
    }

    // Create or Update daily entry
    save() {
        // TODO: Implement database logic
        // If entry_id exists, update; otherwise, insert new record
    }

    // Read all daily entries
    static fetchAll() {
        // TODO: Implement database query to fetch all daily entries
    }

    // Read daily entry by ID
    static fetchById(entry_id) {
        // TODO: Implement database query to fetch daily entry by ID
    }

    // Read daily entries by employee
    static fetchByEmployee(employee_id) {
        // TODO: Implement database query to fetch daily entries by employee
    }

    // Read daily entries by date
    static fetchByDate(entry_date) {
        // TODO: Implement database query to fetch daily entries by date
    }

    // Read daily entries by date range
    static fetchByDateRange(start_date, end_date) {
        // TODO: Implement database query to fetch daily entries by date range
    }

    // Update daily entry
    static update(entry_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete daily entry
    static delete(entry_id) {
        // TODO: Implement database delete logic
    }

};
