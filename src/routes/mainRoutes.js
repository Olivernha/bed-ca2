const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const questRouter = require("./questRoutes");
const itemRoutes = require("./itemRoutes");
const userRoutes = require("./userRoutes");
const taskprogressRoutes = require("./taskProgressRoutes");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const messageRoutes = require("./messageRoutes");

router.use("/messages", messageRoutes);
router.use("/quests", jwtMiddleware.verifyToken, questRouter);

router.use("/items", jwtMiddleware.verifyToken, itemRoutes);
router.use("/users", jwtMiddleware.verifyToken, userRoutes);
router.use("/taskprogress", jwtMiddleware.verifyToken, taskprogressRoutes);

router.use("/", authRouter);

module.exports = router;
