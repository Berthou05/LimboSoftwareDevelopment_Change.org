// DailyEntry Model
// DailyEntry(entry_id, employee_id, entry_date, to_do, done, blockers, slack_standup_URL)

const db = require('../utils/database.js');

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

    /*findByEmployeeAndDate(employee_id, entry_date)
    Function responsible for obtaining an entry for an employee on a
    specific date.*/

    static findByEmployeeAndDate(employee_id, entry_date) {
        return db.execute(
            `SELECT entry_id
            FROM dailyentry
            WHERE employee_id = ?
            AND entry_date = ?
            LIMIT 1`,
            [employee_id, entry_date],
        );
    }

    /*create(employee_id, team_id, entry_date, to_do, done, blockers, slack_standup_URL)
    Function responsible for storing a daily entry and returning the
    generated entry_id.*/

    static create(employee_id, team_id, entry_date, to_do, done, blockers, slack_standup_URL) {
        let createdEntryId = '';

        return db.execute('SELECT UUID() AS entry_id')
            .then(([rows]) => {
                createdEntryId = rows[0]?.entry_id || '';
                return db.execute(
                    `INSERT INTO dailyentry(
                        entry_id,
                        employee_id,
                        team_id,
                        entry_date,
                        to_do,
                        done,
                        blockers,
                        slack_standup_URL
                    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        createdEntryId,
                        employee_id,
                        team_id,
                        entry_date,
                        to_do,
                        done,
                        blockers,
                        slack_standup_URL,
                    ],
                );
            })
            .then(() => createdEntryId);
    }
};
