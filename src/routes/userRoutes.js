//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require("express");
const taskProgressRoutes = require("./taskProgressRoutes");
//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////

const router = express.Router();
const controller = require("../controllers/userController");
const questController = require("../controllers/questController");
const taskController = require("../controllers/taskController");
const taskProgressController = require("../controllers/taskProgressController");

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////

router.get("/", controller.readAllUsers);
router.post("/", controller.createNewUser);

router.get("/:user_id", controller.readUserById);
router.put("/:user_id", controller.updateUserById);
router.delete("/:user_id", controller.deleteUserById);

router.get("/:user_id/quests", questController.readAllQuestsByUserId);
router.post("/:user_id/quests/:quest_id", controller.createJoinedQuestByUserId);
router.get('/:user_id/quests/completed', questController.readAllCompletedQuestsByUserId);
router.delete("/:user_id/taskprogress", taskProgressController.deleteTaskProgressByUserId);

// router.get("/:user_id/user_quest", controller.readUserQuestsByUserId);

router.get("/:user_id/quest/tasks", taskController.readAllTasksByUserId);


module.exports = router;

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
