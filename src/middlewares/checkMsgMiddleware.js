const messageModel = require("../models/messageModel");

module.exports.checkMsg = (req, res, next) => {
  //only a user can edit their own message
  const { user_id, message_id } = req.body;
  if (!user_id || !message_id) {
    res.sendStatus(400);
    return;
  }
  const data = { user_id, message_id }; // ES6 shorthand syntax
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkMsg:", error);
      res.status(500).json(error);
    } else {
      if (results[0].length == 0) {
        res
          .status(403)
          .json({
            error: "You are not authorized to edit or delete this message",
          });
      } else {
        next();
      }
    }
  };

  messageModel.checkMsg(data, callback);
};

