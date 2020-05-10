const Post = require('../models/post.model');

exports.loadAll = async (req, res) => {
  try {
    res.json(await Post.find());
  } catch (err) {
    res.status(500).json(err);
  }
};