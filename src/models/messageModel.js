const pool = require("../services/db");

module.exports.selectAll = (callback) => {
  //get message with user details
  const SQLSTATMENT = `
  SELECT m.*, u.*
  FROM message m
  JOIN user u ON m.user_id = u.user_id
  ORDER BY m.message_id DESC;
    `;

  pool.query(SQLSTATMENT, callback);
};

module.exports.selectById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT m.*,u.*
    FROM message m
    JOIN user u ON m.user_id = u.user_id
    WHERE message_id = ?;
    `;
  const VALUES = [data.message_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO Message (message,title,user_id)
    VALUES (?, ?, ?);
    `;
  const VALUES = [data.message, data.title, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE Message
    SET message = ?, user_id = ?, title = ?
    WHERE message_id = ?;
    `;
  const VALUES = [data.message, data.user_id, data.title, data.message_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.deleteById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM Message
    WHERE message_id = ?;

    DELETE FROM Message
    WHERE message_id = ?;
    `;
  const VALUES = [data.message_id, data.message_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
module.exports.checkMsg = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM Message
    WHERE user_id = ? AND message_id = ?;
    `;
  const VALUES = [data.user_id, data.message_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};
