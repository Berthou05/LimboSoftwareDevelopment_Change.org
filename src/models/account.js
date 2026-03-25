// Account Model
// Account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at)

const bcrypt = require('bcrypt');
const db = require('../util/database');
const { response } = require('express');

const AccountStatus = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED'
};

module.exports = class Account {
    constructor(employee_id, email, password, slack_username, image) {
        this.employee_id = employee_id;
        this.email = email;
        this.password = password;
        this.slack_username = slack_username;
        this.image = image;
    }

    findById(account_id){
        return db.execute('SELECT * FROM accounts WHERE account_id = ?', [account_id]);
    }

    // Create or Update account
    save() {
        // TODO: Implement database logic
        return bcrypt.hash(this.password, 12).then((password_cifred)=>{
            //! Integrate the UUID() for the generation of the account_id
            return db.execute('INSERT INTO account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at) VALUES(UUID(),?,?,?,?,?,?,?,?,NOW())',
                [this.employee_id, this.email,password_cifred, this.slack_username, AccountStatus.ACTIVE, 0,null, null]);
            })
            .catch((error)=>{
            console.log(error);
            return response.redirect('/');
        });
    }

    static getAccountIdByEmailSlack(email, slack_username){
        return db.execute('SELECT account_id FROM account WHERE email=? AND slack_username=?',[email, slack_username]);
    }

    // Read account by email
    static fetchByEmail(email) {
        return db.execute('SELECT * FROM account WHERE email=?',[email]);
    }

    static getPrivilegesFromAccountId(account_id){
        return db.execute('SELECT P.privilege_id FROM privilege AS P INNER JOIN roleprivilege AS RP ON RP.privilege_id=P.privilege_id INNER JOIN role AS R ON R.role_id=RP.role_id INNER JOIN accountrole AS AR ON R.role_id= AR.role_id INNER JOIN account AS A ON AR.account_id=A.account_id WHERE A.account_id=?;',[account_id])
    }

    // Read all accounts
    static fetchAll() {
        // TODO: Implement database query to fetch all accounts
    }

    // Read account by ID
    static fetchById(account_id) {
        // TODO: Implement database query to fetch account by ID
    }

    // Read account by employee ID
    static fetchByEmployee(employee_id) {
        // TODO: Implement database query to fetch account by employee
    }

    // Read accounts by status
    static fetchByStatus(status) {
        // TODO: Implement database query to fetch accounts by status
    }

    // Update account
    static update(account_id, updateData) {
        // TODO: Implement database update logic
    }

    // Delete account
    static delete(account_id) {
        // TODO: Implement database delete logic
    }

};

module.exports.AccountStatus = AccountStatus;
