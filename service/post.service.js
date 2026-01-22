const postModel = require("../models/post.model");
const fileService = require("./file.service");

class PostService {
  async create(post, picture, author) {
    const fileName = fileService.save(picture);
    const newpost = await postModel.create({
      ...post,
      picture: fileName,
      author,
    });
    return newpost;
  }
}

module.exports = new PostService();
