const Post = require('../models/post.model');

exports.loadAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addPost = async (req, res) => {
  try {
    const { title, content, email } = req.body;

    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const invalidSigns = /[<>%\$]/;

    /* NEW POST FORM VALIDATION */
    let isValid = true;
    if (!title && !content && !email) isValid = false;
    else if (title.length < 10 && title.length > 50) isValid = false;
    else if (content.length < 20) isValid = false;
    else if (!validEmail.test(email)) isValid = false;

    if (isValid) {
      const newPost = new Post({ ...req.body });
      await newPost.save();
      res.json(newPost);
    } else {
      throw new Error('Wrong input!');
    }

  } catch (err) {
    res.status(500).json(err);
  }
};