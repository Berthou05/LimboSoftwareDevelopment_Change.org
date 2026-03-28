// Report Model
// Report(report_id, generated_by_employee_id, content_id, content_type, prompt_id, period_start, period_end, created_at, content_json, filters_json, input_snapshot_json, model_name, model_version, ai_output_text)

const db = require('../utils/database.js');

module.exports = class Report {

    constructor(report_id, generated_by_employee_id, content_id, content_type, prompt_id, period_start, period_end, created_at, content_json, filters_json, input_snapshot_json, model_name, model_version, ai_output_text) {
        this.report_id = report_id;
        this.generated_by_employee_id = generated_by_employee_id;
        this.content_id = content_id;
        this.content_type = content_type;
        this.prompt_id = prompt_id;
        this.period_start = period_start;
        this.period_end = period_end;
        this.created_at = created_at;
        this.content_json = content_json;
        this.filters_json = filters_json;
        this.input_snapshot_json = input_snapshot_json;
        this.model_name = model_name;
        this.model_version = model_version;
        this.ai_output_text = ai_output_text;
    }

    // Create or Update report
    save() {
        // TODO: Implement database logic
        // If report_id exists, update; otherwise, insert new record
    }

    // Read all reports
    static fetchAll() {
        // TODO: Implement database query to fetch all reports
    }

    // Read report by ID
    static fetchById(report_id) {
        // TODO: Implement database query to fetch report by ID
    }

    // Read reports by employee
    static fetchByEmployee(generated_by_employee_id) {
        // TODO: Implement database query to fetch reports by employee
    }

    static fetchLatestByProjectAndEmployee(project_id, employee_id, limit = '5') {
        return db.execute(
            `SELECT
                report_id,
                generated_by_employee_id,
                content_id,
                content_type,
                period_start,
                period_end,
                created_at,
                model_name,
                model_version,
                ai_output_text
            FROM report
            WHERE generated_by_employee_id = ?
                AND content_type = 'PROJECT'
                AND content_id = ?
            ORDER BY created_at DESC
            LIMIT ?;`,
            [project_id, employee_id, limit],
        );
    }

    // Read reports by prompt
    static fetchByPrompt(prompt_id) {
        // TODO: Implement database query to fetch reports by prompt
    }

    // Read reports by content type
    static fetchByContentType(content_type) {
        // TODO: Implement database query to fetch reports by content type
    }

    // Read reports by date range
    static fetchByDateRange(start_date, end_date) {
        // TODO: Implement database query to fetch reports by date range
    }

    // Update report
    static update(report_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete report
    static delete(report_id) {
        // TODO: Implement database delete logic
    }

};
