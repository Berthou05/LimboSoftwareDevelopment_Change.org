// Achievement Model
// Achievement(achievement_id, project_id, employee_responsible_id, title, description, achievement_date, evidence_link)

const db = require('../utils/database.js');

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

    /*getAchievementsFromEmp(employee_id, start_date, end_date)
    Function responsible for obtaining all the achievements from
    all projects where employee whose id=employee_id collaborated
    at between provided date range*/

    getAchievementsFromEmp(employee_id, start_date, end_date){
        return db.execute('SELECT A.title, A.description, A.achievement_date, A.evidence_link, A.project_id FROM achievement as A INNER JOIN collaboration as C ON A.project_id=C.project_id WHERE C.employee_id=? AND C.started_at>=? AND (C.ended_at<= ? OR C.ended_at IS NULL);',
            [employee_id, start_date, end_date]);
    }

    /*fetchByProject(project_id)
    Function responsible for returning all achievements of a project*/
    static fetchByProject(project_id) {
        return db.execute(
            `SELECT
                A.achievement_id,
                A.project_id,
                A.employee_responsible_id,
                A.title,
                A.description,
                A.achievement_date,
                A.evidence_link,
                E.full_name
            FROM achievement AS A
            LEFT JOIN employee AS E
                ON E.employee_id = A.employee_responsible_id
            WHERE A.project_id = ?
            ORDER BY A.achievement_date DESC, A.title ASC;`,
            [project_id],
        );
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
