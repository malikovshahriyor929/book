const postModel = require("../models/post.model");
const fileService = require("./file.service");

class PostService {
  async create(post, picture) {
    const fileName = fileService.save(picture);
    const newpost = await postModel.create({
      ...post,
      picture: fileName,
    });
    return newpost;
  }
}

module.exports = new PostService();
