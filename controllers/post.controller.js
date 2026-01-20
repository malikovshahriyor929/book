const postModel = require("../models/post.model");
const postService = require("../server/post.service");

class PostConroller {
  async getAll(req, res) {
    try {
      const post = await postModel.find();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async create(req, res) {
    try {
      const { title, body } = req.body;
      const newpost = await postService.create({ title, body });
      res.status(201).json(newpost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      const newpost = await postModel.findByIdAndUpdate(
        id,
        { title, body },
        { new: true },
      );
      res.status(201).json(newpost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const newpost = await postModel.deleteOne({ _id: id });
      res.status(201).json(newpost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PostConroller();
