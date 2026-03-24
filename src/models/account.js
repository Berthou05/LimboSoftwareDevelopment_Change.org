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
    constructor(employee_id, email, password, slack_username) {
        this.employee_id = employee_id;
        this.email = email;
        this.password = password;
        this.slack_username = slack_username;
    }

    findById(account_id){
        db.execute('SELECT * FROM accounts WHERE account_id = ?', [account_id])
    }

    // Create or Update account
    save() {
        // TODO: Implement database logic
        return bcrypt.hash(this.password, 12).then((password_cifrado)=>{
            //! Integrate the UUID() for the generation of the account_id
                    return db.execute('INSERT INTO users(username, password, nombre) Values(?,?,?)',
                        [this.username,password_cifrado,this.name]);
                })
                .catch((error)=>{
                    console.log(error);
                    return response.redirect('/');
        });
    }

    // Read account by email
    static fetchByEmail(email) {
        // TODO: Implement database query to fetch account by email
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
