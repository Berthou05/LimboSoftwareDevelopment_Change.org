// Account Model
// Account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at)

const bcrypt = require('bcrypt');
const db = require('../utils/database.js');

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


    /*save()
    Function responsible for Account object storing into database.*/

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifred)=>{
            return db.execute('INSERT INTO account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at) VALUES(UUID(),?,?,?,?,?,?,?,?,NOW())',
                [this.employee_id, this.email,password_cifred, this.slack_username, AccountStatus.ACTIVE, 0,null, null]);
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
        return db.execute('SELECT * FROM account WHERE email=?',[email]);
    }

    /*getPrivilegesFromAccountId(account_id)
    Function responsible for obtaining an account privileges based on
    account_id*/

    static getPrivilegesFromAccountId(account_id){
        return db.execute('SELECT P.privilege_id FROM privilege AS P INNER JOIN roleprivilege AS RP ON RP.privilege_id=P.privilege_id INNER JOIN role AS R ON R.role_id=RP.role_id INNER JOIN accountrole AS AR ON R.role_id= AR.role_id INNER JOIN account AS A ON AR.account_id=A.account_id WHERE A.account_id=?;',[account_id])
    }

    /*fetchAll()
    Function responsible for returning all accounts of the application.*/
    static fetchAll(){
        return db.execute('SELECT * FROM account');
    }
};

module.exports.AccountStatus = AccountStatus;
