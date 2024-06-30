const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

router.post(
    "/register",
    userController.checkUsernameOrEmailExist,
    bcryptMiddleware.hashPassword,
    userController.register,
    jwtMiddleware.generateToken,
    jwtMiddleware.sendToken
);
router.post(
    "/login",
    userController.login,
    bcryptMiddleware.comparePassword,
    jwtMiddleware.generateToken,
    jwtMiddleware.sendToken
);

router.post(
    "/jwt/generate",
    authController.preTokenGenerate,
    jwtMiddleware.generateToken,
    authController.beforeSendToken,
    jwtMiddleware.sendToken
);
router.get(
    "/jwt/verify",
    jwtMiddleware.verifyToken,
    authController.showTokenVerified
);
router.post(
    "/bcrypt/compare",
    authController.preCompare,
    bcryptMiddleware.comparePassword,
    authController.showCompareSuccess
);
router.post(
    "/bcrypt/hash",
    bcryptMiddleware.hashPassword,
    authController.showHashing
);

module.exports = router;