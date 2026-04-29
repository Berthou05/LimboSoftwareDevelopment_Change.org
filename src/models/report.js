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
        return db.execute(`
            SELECT R.report_id, R.content_id, R.ai_output_text, R.content_type, R.filters_json
            FROM report as R
            WHERE R.report_id=?;`,
            [report_id]);
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

    static fetchLatestByEmployeeAndType(generated_by_employee_id, content_type, limit = '6') {
        return db.execute(
            `SELECT
                R.report_id,
                R.generated_by_employee_id,
                R.content_id,
                R.content_type,
                R.period_start,
                R.period_end,
                R.created_at,
                COALESCE(E.full_name, P.name, T.name, 'Unknown subject') AS subject_name
            FROM report AS R
            LEFT JOIN employee AS E
                ON R.content_type = 'EMPLOYEE'
                AND E.employee_id = R.content_id
            LEFT JOIN project AS P
                ON R.content_type = 'PROJECT'
                AND P.project_id = R.content_id
            LEFT JOIN team AS T
                ON R.content_type = 'TEAM'
                AND T.team_id = R.content_id
            WHERE R.generated_by_employee_id = ?
                AND R.content_type = ?
            ORDER BY R.created_at DESC
            LIMIT ?;`,
            [generated_by_employee_id, content_type, limit],
        );
    }

    static fetchHistoryByEmployee(generated_by_employee_id, filters = {}) {
        const conditions = ['R.generated_by_employee_id = ?'];
        const parameters = [generated_by_employee_id];

        if (filters.type && filters.type !== 'ALL') {
            conditions.push('R.content_type = ?');
            parameters.push(filters.type);
        }

        if (filters.subject) {
            conditions.push(`COALESCE(E.full_name, P.name, T.name, 'Unknown subject') LIKE ?`);
            parameters.push(`%${filters.subject}%`);
        }

        if (filters.startDate) {
            conditions.push('DATE(R.created_at) >= ?');
            parameters.push(filters.startDate);
        }

        if (filters.endDate) {
            conditions.push('DATE(R.created_at) <= ?');
            parameters.push(filters.endDate);
        }

        return db.execute(
            `SELECT
                R.report_id,
                R.generated_by_employee_id,
                R.content_id,
                R.content_type,
                R.period_start,
                R.period_end,
                R.created_at,
                COALESCE(E.full_name, P.name, T.name, 'Unknown subject') AS subject_name
            FROM report AS R
            LEFT JOIN employee AS E
                ON R.content_type = 'EMPLOYEE'
                AND E.employee_id = R.content_id
            LEFT JOIN project AS P
                ON R.content_type = 'PROJECT'
                AND P.project_id = R.content_id
            LEFT JOIN team AS T
                ON R.content_type = 'TEAM'
                AND T.team_id = R.content_id
            WHERE ${conditions.join(' AND ')}
            ORDER BY R.created_at DESC
            LIMIT ?;`,
            [...parameters, filters.limit || '100'],
        );
    }

    static fetchHistorySubjectsByEmployee(generated_by_employee_id) {
        return db.execute(
            `SELECT DISTINCT
                R.content_id,
                R.content_type,
                COALESCE(E.full_name, P.name, T.name, 'Unknown subject') AS subject_name
            FROM report AS R
            LEFT JOIN employee AS E
                ON R.content_type = 'EMPLOYEE'
                AND E.employee_id = R.content_id
            LEFT JOIN project AS P
                ON R.content_type = 'PROJECT'
                AND P.project_id = R.content_id
            LEFT JOIN team AS T
                ON R.content_type = 'TEAM'
                AND T.team_id = R.content_id
            WHERE R.generated_by_employee_id = ?
            ORDER BY subject_name ASC;`,
            [generated_by_employee_id],
        );
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

    static fetchLatestReport(employee_id, content_id, limit = '1') {
        return db.execute(
            `SELECT R.report_id, R.content_id, R.period_start, R.period_end, R.created_at, R.content_type
            FROM report AS R
            WHERE R.content_id=? AND R.generated_by_employee_id=?
            ORDER BY R.created_at DESC
            LIMIT ?;`,
            [content_id, employee_id, limit],
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
