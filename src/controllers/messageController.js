const model = require("../models/messageModel.js");
const pool = require("../services/db.js");

module.exports.createMessage = (req, res, next) => {
  if (req.body.message == undefined || req.body.message_ == "") {
    res.status(400).send("Error: message_text is undefined");
    return;
  }
  if (req.body.title == undefined || req.body.title == "") {
    res.status(400).send("Error: message_text is undefined");
    return;
  } else if (req.body.user_id == undefined) {
    res.status(400).send("Error: user_id is undefined");
    return;
  }

  const data = {
    user_id: req.body.user_id,
    message: req.body.message,
    title: req.body.title,
  };

  console.log("data", data);

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createMessage:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results);
    }
  };

  model.insertSingle(data, callback);
};

module.exports.readMessageById = (req, res, next) => {
  const data = {
    message_id: req.params.message_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readMessageById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Message not found",
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectById(data, callback);
};

module.exports.readAllMessage = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllMessage:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAll(callback);
};

module.exports.updateMessageById = (req, res, next) => {
  if (req.params.message_id == undefined) {
    res.status(400).send("Error: id is undefined");
    return;
  }
  if (req.body.message == undefined || req.body.message == "") {
    res.status(400).send("Error: message_text is undefined or empty");
    return;
  }
  if (req.body.user_id == undefined) {
    res.status(400).send("Error: userId is undefined");
    return;
  }
  if (req.body.title == undefined || req.body.title == "") {
    res.status(400).send("Error: title is undefined or empty");
    return;
  }
  const data = {
    message_id: req.params.message_id,
    user_id: req.body.user_id,
    message: req.body.message,
    title: req.body.title,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateMessageById:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.updateById(data, callback);
};

module.exports.deleteMessageById = (req, res, next) => {
  const data = {
    message_id: req.params.message_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteMessageById:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.deleteById(data, callback);
};
