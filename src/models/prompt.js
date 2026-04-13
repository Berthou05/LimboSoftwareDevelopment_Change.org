// Prompt Model
// Prompt(prompt_id, name, description, type)

const db = require('../utils/database.js');

const type = {
    EMPLOYEE:'EMPLOYEE',
    TEAM:'TEAM',
    PROJECT:'PROJECT'
};

module.exports = class Prompt {
    constructor(name, description, type){
        this.name = name;
        this.description = description;
        this.type = type;
    }

    /*getPromptByType(report_type);
    Function responsible for obtaining a prompt based on the report type
    This functions works as there is only one prompt per report*/

    static getPromptByType(report_type){
        return db.execute(`
            SELECT P.description 
            FROM prompt as P 
            WHERE P.type=?`,
            [report_type]);
    }

    

}
