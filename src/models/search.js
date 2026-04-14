import db from '../utils/database.js';

export async function getNameFromId(content_id){
    return db.execute(`
        SELECT * FROM (
            SELECT employee_id, full_name 
            FROM employee 
            WHERE employee_id = ?
            
            UNION ALL
            
            SELECT team_id, name
            FROM team 
            WHERE team_id = ?
            
            UNION ALL
            
            SELECT project_id, name 
            FROM project 
            WHERE project_id = ?
        ) AS results
        LIMIT 1;`,
        [content_id, content_id, content_id]); 
}

