const pool = require("../services/db");

module.exports.createQuest = (data, callback) => {
  const SQLSTATEMENT = `
        INSERT INTO Quest(title,description,difficulty_level,reward_experience_points,reward_gold,reward_item_id)
        VALUES (?,?,?,?,?,?);
        `;
  const VALUES = [
    data.title,
    data.description,
    data.difficulty_level,
    data.reward_experience_points,
    data.reward_gold,
    data.reward_item_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.readAllQuests = (callback) => {
  const SQLSTATEMENT = `SELECT *
FROM Quest;`;

  pool.query(SQLSTATEMENT, callback);
};
module.exports.readAllQuestsByUserId = (data, callback) => {
  const SQLSTATEMENT = `SELECT quest.*
FROM quest
LEFT JOIN user_quest ON quest.quest_id = user_quest.quest_id AND user_quest.user_id = ?
WHERE user_quest.user_quest_id IS NULL;
`;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.readQuestById = (data, callback) => {
  const SQLSTATEMENT = `SELECT q.*, i.*
FROM quest q
JOIN item i ON q.reward_item_id = i.item_id WHERE quest_id = ?;`;

  const VALUES = [data.quest_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.updateQuestById = (data, callback) => {
  const SQLSTATEMENT = `UPDATE Quest SET title = ?, description = ?, difficulty_level = ?, reward_experience_points = ?, reward_gold = ?, reward_item_id = ? WHERE quest_id = ?;`;
  const VALUES = [
    data.title,
    data.description,
    data.difficulty_level,
    data.reward_experience_points,
    data.reward_gold,
    data.reward_item_id,
    data.quest_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
module.exports.deleteQuestById = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM Quest WHERE quest_id = ? ;
    ALTER TABLE Quest AUTO_INCREMENT = 1;
`;

  const VALUES = [data.quest_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.readAllCompletedQuestsByUserId = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE user_quest
  SET completed = 1
  WHERE user_id = ?
    AND quest_id IN (
      SELECT tq.quest_id
      FROM (
          SELECT t.quest_id, COUNT(t.task_id) AS total_tasks
          FROM task t
          GROUP BY t.quest_id
      ) AS tq
      LEFT JOIN (
          SELECT t.quest_id, COUNT(tp.task_id) AS completed_tasks
          FROM task t
          LEFT JOIN taskprogress tp ON t.task_id = tp.task_id AND tp.user_id = ?
          GROUP BY t.quest_id
      ) AS ct ON tq.quest_id = ct.quest_id
      WHERE tq.total_tasks = ct.completed_tasks OR ct.completed_tasks IS NULL
  );
  
  
  
SELECT quest.*
FROM quest
JOIN user_quest ON quest.quest_id = user_quest.quest_id AND user_quest.user_id = ?
WHERE user_quest.completed = 1;

`;
  const VALUES = [data.user_id, data.user_id, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
