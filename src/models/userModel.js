const pool = require("../services/db");

module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `SELECT * FROM User;`;
  pool.query(SQLSTATEMENT, callback);
};
module.exports.selectById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO User(user_id,username ,email ,password,points)
    VALUES (?,?,?,?,?);
    `;
  const VALUES = [
    data.user_id,
    data.username,
    data.email,
    data.password,
    data.points,
  ];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, email = ? , password = ?
    WHERE user_id = ?;
    `;
  const VALUES = [data.username, data.email, data.password, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.deleteById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
module.exports.selectByUsernameOrEmail = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ? OR email = ?;
    `;
  const VALUES = [data.username, data.email];
  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.selectByUsername = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
  const VALUES = [data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
};
module.exports.createJoinedQuestByUserId = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO user_quest(user_id,quest_id,completed)
    VALUES (?,?,?);

    `;
  const VALUES = [data.user_id, data.quest_id, false];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// module.exports.readUserQuestsByUserId = (data, callback) => {
//   const SQLSTATEMENT = `
//     SELECT q.*, uq.completed
//     FROM user_quest uq
//     JOIN quest q ON q.quest_id = uq.quest_id
//     WHERE uq.user_id = ?;
//     `;
//   const VALUES = [data.user_id];

//   pool.query(SQLSTATEMENT, VALUES, callback);
// };

module.exports.addPointsToUser = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User
    SET points = points + ?
    WHERE user_id = ?;
    `;
  const VALUES = [data.points, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
