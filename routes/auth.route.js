const express = require("express");
const authController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/register", authController.register);

router.get("/activation/:id", authController.activation);

module.exports = router;
