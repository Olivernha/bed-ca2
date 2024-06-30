const pool = require("../services/db");
module.exports.createNewTaskProgressByUserQuest = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO taskprogress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?,?)
    `;
  const VALUES = [data.user_id, data.task_id, data.completion_date, data.note];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateTaskProgressById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE taskprogress
    SET completion_date = ?, notes = ?
    WHERE user_id = ? AND task_id = ?;
    
    `;
  const VALUES = [data.completion_date, data.note, data.user_id, data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.readTaskProgressById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM taskprogress
    WHERE progress_id = ?;
    `;
  const VALUES = [data.taskprogress_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteTaskProgressByUserId = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM taskprogress
    WHERE user_id = ? AND completion_date is NOT NULL;
    `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
