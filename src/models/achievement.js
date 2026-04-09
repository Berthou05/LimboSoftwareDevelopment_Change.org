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

    /*create(project_id, employee_responsible_id, title, description, achievement_date, evidence_link)
    Function responsible for creating a new achievement for a project from the add popup.*/

    static create(project_id, employee_responsible_id, title, description, achievement_date, evidence_link) {
        return db.execute(
            `INSERT INTO achievement (
                achievement_id,
                project_id,
                employee_responsible_id,
                title,
                description,
                achievement_date,
                evidence_link
            ) VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
            [project_id, employee_responsible_id, title, description, achievement_date, evidence_link],
        );
    }

    /*fetchById(achievement_id)
    Function responsible for reading one achievement. It is used to validate edit/delete operations.*/

    static fetchById(achievement_id) {
        return db.execute(
            `SELECT
                achievement_id,
                project_id,
                employee_responsible_id,
                title,
                description,
                achievement_date,
                evidence_link
            FROM achievement
            WHERE achievement_id = ?
            LIMIT 1`,
            [achievement_id],
        );
    }

    /*update(achievement_id, project_id, title, description, achievement_date, evidence_link)
    Function responsible for updating one achievement inside its project.*/

    static update(achievement_id, project_id, title, description, achievement_date, evidence_link) {
        return db.execute(
            `UPDATE achievement
            SET
                title = ?,
                description = ?,
                achievement_date = ?,
                evidence_link = ?
            WHERE achievement_id = ?
                AND project_id = ?`,
            [title, description, achievement_date, evidence_link, achievement_id, project_id],
        );
    }

    /*delete(achievement_id, project_id)
    Function responsible for deleting one achievement. project_id is optional and used as a safety filter in project routes.*/

    static delete(achievement_id, project_id = null) {
        if (project_id) {
            return db.execute(
                'DELETE FROM achievement WHERE achievement_id = ? AND project_id = ?',
                [achievement_id, project_id],
            );
        }

        return db.execute('DELETE FROM achievement WHERE achievement_id = ?', [achievement_id]);
    }

    //------------------------- Report Functions -----------------------

        /*getAchievementsFromEmp(employee_id, start_date, end_date)
    Function responsible for obtaining all the achievements from
    all projects where employee whose id=employee_id collaborated
    at between provided date range*/

    getAchievementsFromEmp(employee_id, start_date, end_date){
        return db.execute( `
            SELECT A.title, A.description, A.achievement_date, A.evidence_link, A.project_id 
            FROM achievement as A 
            INNER JOIN collaboration as C ON A.project_id=C.project_id 
            WHERE C.employee_id=? AND C.started_at>=? AND (C.ended_at<= ? OR C.ended_at IS NULL);`,
            [employee_id, start_date, end_date]);
    }

    /*getAchievementsFromTeam(team_id, start_date, end_date)
    Function responsible for obtaining a all project achievements where a team
    was assigned between a date range*/

    getAchievementsFromTeam(team_id, start_date){
        return db.execute(`
            SELECT A.title, A.description, A.achievement_date, A.evidence_link, A.project_id
            FROM achievement as A 
            INNER JOIN collaboration as C ON A.project_id=C.project_id 
            WHERE C.project_id IN( 
                SELECT PT.project_id 
                FROM projectteam AS PT 
                WHERE PT.team_id =? AND PT.joined_at>=? AND PT.joined_at<=?);`,
            [team_id, start_date, end_date]);
    }

    /*getAchievementsFromProj(project_id, start_date, end_date)
    Function responsible for obtaining all achievements of a project between a specified date range*/

    static getAchievementsFromProj(project_id, start_date, end_date){
        return db.execute(`
            SELECT A.title, A.description, A.achievement_date, A.evidence_link, A.project_id 
            FROM achievement as A 
            WHERE A.project_id=? AND A.achievement_date BETWEEN ? AND ?;`,
            [project_id, start_date, end_date])
    }

    
};
