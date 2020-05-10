const Post = require('../models/post.model');

exports.loadAll = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'Published' });
    if (!posts) res.status(404).json({ post: 'Not Found' });
    else res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loadPostById = async (req, res) => {
  try {
    console.log(req.params);
    const post = await Post.find({ _id: req.params.id });
    if (!post) res.status(404).json({ post: 'Not Found' });
    else res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loadByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const posts = await Post.find({ user: user });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addPost = async (req, res) => {
  try {
    const { title, content, email } = req.fields;
    const file = req.files.image.path;
    const fileName = file.split('/').slice(-1)[0];
    const validFileExtension = /(.*?)\.(jpg|jpeg|gif|png)$/;
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const invalidSigns = /[<>%\$]/;

    /* NEW POST FORM VALIDATION */
    let isValid = true;
    if (!title && !content && !email) isValid = false;
    else if (title.length < 10 && title.length > 50) isValid = false;
    else if (content.length < 20) isValid = false;
    else if (!validEmail.test(email)) isValid = false;
    else if (!validFileExtension.test(fileName)) isValid = false;

    if (isValid) {
      const newPost = new Post({ ...req.fields, image: fileName });
      await newPost.save();
      res.json(newPost);
    } else {
      throw new Error('Wrong input!');
    }

  } catch (err) {
    res.status(500).json(err);
  }
};