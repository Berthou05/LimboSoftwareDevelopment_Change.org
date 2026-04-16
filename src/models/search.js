import db from '../utils/database.js';

export async function getNameFromId(content_id){
    return db.execute(`
        SELECT * FROM (
            SELECT employee_id AS 'id', full_name AS 'name' 
            FROM employee 
            WHERE employee_id = ?
            
            UNION ALL
            
            SELECT team_id AS 'id', name
            FROM team 
            WHERE team_id = ?
            
            UNION ALL
            
            SELECT project_id AS 'id', name 
            FROM project 
            WHERE project_id = ?
        ) AS results
        LIMIT 1;`,
        [content_id, content_id, content_id]); 
}

