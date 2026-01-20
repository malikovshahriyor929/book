const postModel = require("../models/post.model");

class PostService {
  async create(post) {
    const newpost = await postModel.create(post);
    return newpost
  }
}

module.exports = new PostService()
