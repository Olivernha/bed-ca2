const taskProgressModel = require("../models/taskProgressModel");

module.exports.createNewTaskProgress = (req, res, next) => {
  const { task_id, user_id, completion_date, note } = req.body;
  console.log(req.body)
  if (!task_id || !user_id || !completion_date) {
    res.sendStatus(400);
    return;
  }
  const data = { task_id, user_id, completion_date, note }; // ES6 shorthand syntax

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskProgressById:", error);
      res.status(500).json(error);
    } else {
      res.locals.data = {
        task_id: task_id,
        user_id: user_id,
        completion_date: completion_date,
        note: note,
      };
      next();
      // req.params.taskprogress_id = results[1][0].progress_id;
      // next();
    }
  };
  taskProgressModel.createNewTaskProgressByUserQuest(data, callback);
};

module.exports.updateTaskProgressById = (req, res, next) => {
  const { task_id, user_id, completion_date, note } = req.body;

  if (!task_id || !user_id || !completion_date) {
    res.sendStatus(400);
    return;
  }
  const data = { task_id, user_id, completion_date, note }; // ES6 shorthand syntax

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskProgressById:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json({
        task_id: task_id,
        user_id: user_id,
        completion_date: completion_date,
        note: note,
      });
      // req.params.taskprogress_id = results[1][0].progress_id;
      // next();
    }
  };
  taskProgressModel.updateTaskProgressById(data, callback);
};
module.exports.readTaskProgressById = (req, res, next) => {
  const { taskprogress_id } = req.params;
  if (!taskprogress_id) {
    res.sendStatus(400);
    return;
  }
  const data = { taskprogress_id }; // ES6 shorthand syntax

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskProgressById:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  taskProgressModel.readTaskProgressById(data, callback);
};

module.exports.deleteTaskProgressByUserId = (req, res, next) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.sendStatus(400);
    return;
  }
  const data = { user_id }; // ES6 shorthand syntax

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskProgressByUserId:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  taskProgressModel.deleteTaskProgressByUserId(data, callback);
};
