const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");

const router = express.Router();

router.get("/get-all", postController.getAll);
router.post("/create", authMiddleware, postController.create);
router.put(
  "/update/:id",
  authMiddleware,
  authorMiddleware,
  postController.update,
);

router.delete("/delete/:id", postController.delete);

module.exports = router;
