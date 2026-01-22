const express = require("express");
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 30 }),
  authController.register,
);
router.post("/login", authController.login);
router.get("/activation/:id", authController.activation);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/all-user", authMiddleware, postController.getAll);

module.exports = router;
