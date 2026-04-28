// Account Model
// Account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at)

const bcrypt = require('bcrypt');
const db = require('../utils/database.js');

const AccountStatus = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED'
};

const ensureResetTokenColumns = async () => {
    return db.execute(`
        ALTER TABLE account
        ADD COLUMN IF NOT EXISTS reset_token_hash varchar(64) DEFAULT NULL,
        ADD COLUMN IF NOT EXISTS reset_token_expires_at datetime DEFAULT NULL
    `);
};

const executeWithResetColumns = async (operation) => {
    try {
        return await operation();
    } catch (error) {
        const isMissingColumn = error && (
            error.code === 'ER_BAD_FIELD_ERROR' ||
            error.errno === 1054 ||
            String(error.message).includes('Unknown column')
        );

        if (!isMissingColumn) {
            throw error;
        }

        await ensureResetTokenColumns();
        return operation();
    }
};

module.exports = class Account {
    constructor(employee_id, email, password, slack_username, image) {
        this.employee_id = employee_id;
        this.email = email;
        this.password = password;
        this.slack_username = slack_username;
        this.image = image;
    }


    /*save()
    Function responsible for Account object storing into database.*/

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifred)=>{
            return db.execute(`
                INSERT INTO account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at) 
                VALUES(UUID(),?,?,?,?,?,?,?,?,NOW())`,
                [this.employee_id, this.email,password_cifred, this.slack_username, AccountStatus.ACTIVE, 0,null, this.image]);
        });
    }

    /*getAccountIdByEmailSlack(email, slack_username)
    Function responsible for obtaining an account_id based on email and
    slack_username*/

    static getAccountIdByEmailSlack(email, slack_username){
        return db.execute('SELECT account_id FROM account WHERE email=? AND slack_username=?',[email, slack_username]);
    }

    /*fetchByEmail(email)
    Function responsible for obtaining all Account information of a tuple
    based on email.*/

    static fetchByEmail(email) {
        return db.execute(`
            SELECT * , E.full_name, E.names
            FROM account AS A
            INNER JOIN employee AS E ON E.employee_id=A.employee_id
            WHERE email=?;`,
            [email]);
    }

    /*findBySlackUsername(slack_username)
    Function responsible for obtaining account information based on
    slack_username.*/

    static findBySlackUsername(slack_username) {
        return db.execute(
            `SELECT account_id, employee_id, status, slack_username
            FROM account
            WHERE slack_username = ?
            LIMIT 1`,
            [slack_username],
        );
    }

    /*getPrivilegesFromAccountId(account_id)
    Function responsible for obtaining an account privileges based on
    account_id*/

    static getPrivilegesFromAccountId(account_id){
        return db.execute('SELECT P.privilege_id FROM privilege AS P INNER JOIN roleprivilege AS RP ON RP.privilege_id=P.privilege_id INNER JOIN role AS R ON R.role_id=RP.role_id INNER JOIN accountrole AS AR ON R.role_id= AR.role_id INNER JOIN account AS A ON AR.account_id=A.account_id WHERE A.account_id=?;',[account_id])
    }

    /*fetchAll()
    Function responsible for returning all accounts of the application.*/
    static fetchAll(role = null, status = null, limit = null, offset = null){
        const conditions = ['WHERE A.account_id=A.account_id'];
        const parameters = [];

        if(role && role !== 'all'){
            conditions.push('R.name=?');
            parameters.push(role);
        }

        if(status && status !== 'all'){
            conditions.push('A.status=?');
            parameters.push(status.toUpperCase());
        }

        const pagination = Number.isInteger(limit) && Number.isInteger(offset)
            ? 'LIMIT ? OFFSET ?'
            : '';

        if(pagination){
            parameters.push(limit, offset);
        }

        return db.execute(`
            SELECT A.account_id, E.full_name, A.email, A.created_at,A.slack_username, A.status, R.name, R.role_id FROM account AS A
            INNER JOIN employee AS E ON E.employee_id=A.employee_id
            INNER JOIN accountrole AS AR ON AR.account_id=A.account_id
            INNER JOIN role as R ON R.role_id=AR.role_id
            ${conditions.join(' AND ')}
            ORDER BY E.full_name ASC
            ${pagination};`,
            parameters);
    }

    /*countAll()
    Function responsible for counting all the accounts of the table*/
    static countAll(role = null, status = null){
        const conditions = ['WHERE A.account_id=A.account_id'];
        const parameters = [];

        if(role && role !== 'all'){
            conditions.push('R.name=?');
            parameters.push(role);
        }

        if(status && status !== 'all'){
            conditions.push('A.status=?');
            parameters.push(status.toUpperCase());
        }

        return db.execute(`
            SELECT COUNT(DISTINCT A.account_id) AS count
            FROM account AS A
            INNER JOIN accountrole AS AR ON AR.account_id=A.account_id
            INNER JOIN role as R ON R.role_id=AR.role_id
            ${conditions.join(' AND ')};`,
            parameters);
    }

    /*updateStatus(account_id)
    Function responsible for updating the role of an account based on id.*/

    static updateStatus(status, account_id){
        return db.execute(`
            UPDATE account 
            SET account.status=? 
            WHERE account_id=?;`,
            [status,account_id]);
    }

    /*fetchById(account_id)
    Function responsible for returning all account data based on Id.*/

    static fetchById(account_id){
        return db.execute(`
            SELECT * 
            FROM account 
            WHERE account_id=?`
            ,[account_id]);
    }

    /*updateProfile(account_id, email, slack_username, image)
    Function responsible for updating editable account profile fields.*/

    static updateProfile(account_id, email, slack_username, image){
        return db.execute(`
            UPDATE account
            SET email = ?,
                slack_username = ?,
                image = ?
            WHERE account_id = ?`,
            [email, slack_username, image, account_id]);
    }

    /*saveResetToken(account_id, reset_token_hash, reset_token_expires_at)
    Function responsible for saving password reset token information.*/

    static saveResetToken(account_id, reset_token_hash, reset_token_expires_at) {
        return executeWithResetColumns(() => db.execute(`
            UPDATE account
            SET reset_token_hash = ?,
                reset_token_expires_at = ?
            WHERE account_id = ?`,
            [reset_token_hash, reset_token_expires_at, account_id]));
    }

    static fetchByEmailAndResetToken(email, reset_token_hash) {
        const sql = email
            ? `SELECT account_id, email, reset_token_expires_at FROM account WHERE email = ? AND reset_token_hash = ?`
            : `SELECT account_id, email, reset_token_expires_at FROM account WHERE reset_token_hash = ?`;
        const params = email ? [email, reset_token_hash] : [reset_token_hash];

        return executeWithResetColumns(() => db.execute(sql, params));
    }

    static clearResetToken(account_id) {
        return executeWithResetColumns(() => db.execute(`
            UPDATE account
            SET reset_token_hash = NULL,
                reset_token_expires_at = NULL
            WHERE account_id = ?
        `, [account_id]));
    }

    static updatePasswordAndClearResetToken(account_id, password_hash) {
        return executeWithResetColumns(() => db.execute(`
            UPDATE account
            SET password_hash = ?,
                reset_token_hash = NULL,
                reset_token_expires_at = NULL
            WHERE account_id = ?
        `, [password_hash, account_id]));
    }

};

module.exports.AccountStatus = AccountStatus;
