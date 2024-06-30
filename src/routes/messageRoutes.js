const express = require("express");
const router = express.Router();

const controller = require("../controllers/messageController");
const checkMsgRUD = require("../middlewares/checkMsgMiddleware");
router.get("/", controller.readAllMessage);
router.post("/", controller.createMessage);
router.get("/:message_id", controller.readMessageById);
router.put("/:message_id", checkMsgRUD.checkMsg, controller.updateMessageById);
router.delete(
  "/:message_id",
  checkMsgRUD.checkMsg,
  controller.deleteMessageById
);

module.exports = router;
