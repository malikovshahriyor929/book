const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.get("/get-all", postController.getAll);
router.post("/create", postController.create);
router.put("/update/:id",postController.update)
router.delete("/delete/:id", postController.delete);

module.exports = router;
