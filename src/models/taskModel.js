const pool = require("../services/db");
module.exports.readAllTasksByUserId = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT q.*, t.*
  FROM user_quest uq
  JOIN quest q ON uq.quest_id = q.quest_id
  JOIN task t ON q.quest_id = t.quest_id
  WHERE uq.user_id = ? AND uq.completed = 0;

`;

  const VALUES = [data.user_id, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
