const Post = require('../models/post.model');

exports.loadAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};