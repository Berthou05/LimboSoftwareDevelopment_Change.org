// Account Model
// Account(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at)

const AccountStatus = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED'
};

module.exports = class Account {

    constructor(account_id, employee_id, email, password_hash, slack_username, status, first_login, last_login, image, created_at) {
        this.account_id = account_id;
        this.employee_id = employee_id;
        this.email = email;
        this.password_hash = password_hash;
        this.slack_username = slack_username;
        this.status = status; // AccountStatus ENUM
        this.first_login = first_login;
        this.last_login = last_login;
        this.image = image;
        this.created_at = created_at;
    }

    findById(account_id){
        db.execute('SELECT * FROM accounts WHERE account_id = ?', [account_id])
    }

    // Create or Update account
    save() {
        // TODO: Implement database logic
        // If account_id exists, update; otherwise, insert new record
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

    // Read account by email
    static fetchByEmail(email) {
        // TODO: Implement database query to fetch account by email
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
