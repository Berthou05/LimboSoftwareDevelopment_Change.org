// Blocker Model
// Blocker(blocker_id, entry_id, employee_id, team_id, category, content, reported_at)

const db = require('../utils/database.js');

const BlockerCategory = {
    TECHNICAL: 'TECHNICAL',
    DEPENDENCIES: 'DEPENDENCIES',
    COMMUNICATION: 'COMMUNICATION',
    PROCESS: 'PROCESS',
    CAPACITY: 'CAPACITY',
    PERSONAL: 'PERSONAL',
};

const ensureBlockerTable = async function ensureBlockerTable() {
    return db.execute(`
        CREATE TABLE IF NOT EXISTS blocker (
            blocker_id char(36) NOT NULL,
            entry_id char(36) NOT NULL,
            employee_id char(36) NOT NULL,
            team_id char(36) NOT NULL,
            category enum(
                'TECHNICAL',
                'DEPENDENCIES',
                'COMMUNICATION',
                'PROCESS',
                'CAPACITY',
                'PERSONAL'
            ) NOT NULL,
            content varchar(500) NOT NULL,
            reported_at date NOT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (blocker_id),
            KEY idx_blocker_entry (entry_id),
            KEY idx_blocker_employee (employee_id),
            KEY idx_blocker_team (team_id),
            KEY idx_blocker_team_date (team_id, reported_at),
            KEY idx_blocker_team_category (team_id, category),
            CONSTRAINT fk_blocker_entry FOREIGN KEY (entry_id) REFERENCES dailyentry (entry_id),
            CONSTRAINT fk_blocker_employee FOREIGN KEY (employee_id) REFERENCES employee (employee_id),
            CONSTRAINT fk_blocker_team FOREIGN KEY (team_id) REFERENCES team (team_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
};

const executeWithBlockerTable = async function executeWithBlockerTable(operation) {
    try {
        return await operation();
    } catch (error) {
        const isMissingTableError = error && (
            error.code === 'ER_NO_SUCH_TABLE'
            || error.errno === 1146
            || String(error.message || '').includes("doesn't exist")
        );

        if (!isMissingTableError) {
            throw error;
        }

        await ensureBlockerTable();
        return operation();
    }
};

const normalizeCategory = function normalizeCategory(value) {
    const normalizedValue = String(value || '').trim().toUpperCase();

    return BlockerCategory[normalizedValue] || '';
};

module.exports = class Blocker {

    constructor(blocker_id, entry_id, employee_id, team_id, category, content, reported_at) {
        this.blocker_id = blocker_id;
        this.entry_id = entry_id;
        this.employee_id = employee_id;
        this.team_id = team_id;
        this.category = category;
        this.content = content;
        this.reported_at = reported_at;
    }

    /*create(entry_id, employee_id, team_id, category, content, reported_at)
    Function responsible for storing a classified blocker linked to a
    daily entry.*/

    static create(entry_id, employee_id, team_id, category, content, reported_at = null) {
        return executeWithBlockerTable(() => db.execute(
            `INSERT INTO blocker(
                blocker_id,
                entry_id,
                employee_id,
                team_id,
                category,
                content,
                reported_at
            ) VALUES(UUID(), ?, ?, ?, ?, ?, ?)`,
            [
                entry_id,
                employee_id,
                team_id,
                normalizeCategory(category),
                String(content || '').trim().slice(0, 500),
                reported_at,
            ],
        ));
    }

    /*fetchByEntry(entry_id)
    Function responsible for returning all blockers classified for a
    daily entry.*/

    static fetchByEntry(entry_id) {
        return executeWithBlockerTable(() => db.execute(
            `SELECT
                blocker_id,
                entry_id,
                employee_id,
                team_id,
                category,
                content,
                reported_at
            FROM blocker
            WHERE entry_id = ?
            ORDER BY reported_at DESC, created_at DESC`,
            [entry_id],
        ));
    }

    /*getTeamCategoryCounts(team_id, start_date, end_date)
    Function responsible for returning blocker counts grouped by category
    for a team, optionally between a date range.*/

    static getTeamCategoryCounts(team_id, start_date = null, end_date = null) {
        const conditions = ['team_id = ?'];
        const parameters = [team_id];

        if (start_date) {
            conditions.push('reported_at >= ?');
            parameters.push(start_date);
        }

        if (end_date) {
            conditions.push('reported_at <= ?');
            parameters.push(end_date);
        }

        return executeWithBlockerTable(() => db.execute(
            `SELECT
                category,
                COUNT(*) AS total
            FROM blocker
            WHERE ${conditions.join(' AND ')}
            GROUP BY category`,
            parameters,
        ));
    }
};

module.exports.BlockerCategory = BlockerCategory;
module.exports.ensureStorage = ensureBlockerTable;
