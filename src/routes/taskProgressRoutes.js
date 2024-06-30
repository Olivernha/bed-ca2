const express = require("express");
const router = express.Router();
const taskProgressController = require("../controllers/taskProgressController");
const userController = require("../controllers/userController");
// router.post(
//   "/",
//   taskprogressController.checkUserOrTaskIsValid,
//   taskprogressController.createNewTaskProgress,
//   taskprogressController.readTaskProgressById
// );
// router.get("/:taskprogress_id", taskprogressController.readTaskProgressById);
// router.put(
//   "/:taskprogress_id",
//   taskprogressController.updateTaskProgressById,
//   taskprogressController.readTaskProgressById
// );
// router.delete(
//   "/:taskprogress_id",
//   taskprogressController.deleteTaskProgressById
// );
router.post(
  "/",
  taskProgressController.createNewTaskProgress,
  userController.addPointsToUser
);
router.put("/", taskProgressController.updateTaskProgressById);

module.exports = router;
