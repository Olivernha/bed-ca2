const taskModel = require("../models/taskModel");
module.exports.readAllTasksByUserId = (req, res) => {
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasksByQuestId:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };
    taskModel.readAllTasksByUserId(data, callback);
}
