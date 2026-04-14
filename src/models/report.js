// Report Model
// Report(report_id, generated_by_employee_id, content_id, content_type, prompt_id, period_start, period_end, created_at, content_json, filters_json, input_snapshot_json, model_name, model_version, ai_output_text)

const db = require('../utils/database.js');

module.exports = class Report {

    constructor(generated_by_employee_id, content_id, content_type, period_start, period_end, content_json, filters_json, model_name, model_version, ai_output_text) {
        this.generated_by_employee_id = generated_by_employee_id;
        this.content_id = content_id;
        this.content_type = content_type;
        this.period_start = period_start;
        this.period_end = period_end;
        this.content_json = content_json;
        this.filters_json = filters_json;
        this.model_name = model_name;
        this.model_version = model_version;
        this.ai_output_text = ai_output_text;
    }

    // Create or Update report
    save() {
        return db.execute(`
            INSERT INTO report(report_id, generated_by_employee_id, content_id, content_type, period_start, period_end, created_at, content_json, filters_json, model_name, model_version, ai_output_text)
            VALUES(UUID(),?,?,?,?,?,NOW(),?,?,?,?,?)`,
            [this.generated_by_employee_id, this.content_id, this.content_type, this.period_start, this.period_end, this.content_json, this.filters_json, this.model_name, this.model_version, this.ai_output_text])
    }

    // Read all reports
    static fetchAll() {
        // TODO: Implement database query to fetch all reports
    }

    // Read report by ID
    static fetchById(report_id) {
        // TODO: Implement database query to fetch report by ID
    }

    static fetchByContentId(employee_id, content_id){
        return db.execute(
            `SELECT *
            FROM report
            WHERE generated_by_employee_id = ?
                AND content_id = ?
            ORDER BY created_at DESC
            LIMIT ?;`,
            [employee_id, content_id, limit],
        );
    };

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
            [employee_id, project_id, limit],
        );
    }

    /*fetchLatestReport(employee_id, content_id, limit);
    Function responsible for obtaining the last created reports of the content_id by
    the employee with id=employee_id*/

    static fetchLatestReport(employee_id, content_id, limit = '5') {
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
                AND content_id = ?
            ORDER BY created_at DESC
            LIMIT ?;`,
            [employee_id, content_id, limit],
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
