const BaseError = require("../errors/base.error");
const postModel = require("../models/post.model");

module.exports = async function (req, res, next) {
  try {
    const post = await postModel.findById(req.params.id);
    const authorId = req.user.id;
    if (!post) next(BaseError.BadRequest("Post not found!"));
    
    if (post.author.toString() !== authorId)
      next(BaseError.BadRequest("Only author can edit and delete this post!"));


    next();
  } catch (error) {
    next(BaseError.BadRequest("User is not Author!"));
  }
};
