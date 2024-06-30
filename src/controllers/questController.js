const model = require("../models/questModel.js");

module.exports.createNewQuest = (req, res, next) => {
  const {
    title,
    description,
    difficulty_level,
    reward_experience_points,
    reward_gold,
    reward_item_id,
  } = req.body;

  if (
    !title ||
    !description ||
    !difficulty_level ||
    !reward_experience_points ||
    !reward_gold ||
    !reward_item_id
  ) {
    res.sendStatus(400);
    return;
  }
  const data = {
    title,
    description,
    difficulty_level,
    reward_experience_points,
    reward_gold,
    reward_item_id,
  }; // ES6 shorthand syntax

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewQuest:", error);
      res.status(500).json(error);
    } else {
      req.params.quest_id = results.insertId;
      next();
    }
  };
  model.createQuest(data, callback);
};

module.exports.readAllQuests = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllQuests:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  model.readAllQuests(callback);
};

module.exports.readAllQuestsByUserId = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllQuestsByUserId:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  model.readAllQuestsByUserId(data, callback);
};
module.exports.readQuestById = (req, res, next) => {
  const data = {
    quest_id: req.params.quest_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readQuestById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.sendStatus(404);
      } else res.status(200).json(results[0]);
    }
  };
  model.readQuestById(data, callback);
};

module.exports.updateQuestById = (req, res, next) => {
  const {
    title,
    description,
    difficulty_level,
    reward_experience_points,
    reward_gold,
    reward_item_id,
  } = req.body;

  if (
    !title ||
    !description ||
    !difficulty_level ||
    !reward_experience_points ||
    !reward_gold ||
    !reward_item_id
  ) {
    res.sendStatus(400);
    return;
  }

  const data = {
    title,
    description,
    difficulty_level,
    reward_experience_points,
    reward_gold,
    reward_item_id,
    quest_id: req.params.quest_id,
  }; // ES6 shorthand syntax

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateQuestById:", error);
      res.status(500).json(error);
    } else {
      req.params.quest_id = data.quest_id;
      next();
    }
  };
  model.updateQuestById(data, callback);
};

module.exports.deleteQuestById = (req, res, next) => {
  const data = {
    quest_id: req.params.quest_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteQuestById:", error);
      res.status(500).json(error);
    } else {
      if (results[0].affectedRows == 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    }
  };
  model.deleteQuestById(data, callback);
};
module.exports.readAllCompletedQuestsByUserId = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllCompletedQuestsByUserId:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  model.readAllCompletedQuestsByUserId(data, callback);
};
