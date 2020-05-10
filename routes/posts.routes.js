const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller');

router.get('/posts', posts.loadAll);
router.get('/post/:id', posts.loadPostById);
router.get('/my-posts', posts.loadByUser);
router.post('/posts', posts.addPost);
router.put('/post/:id', posts.editPost);


module.exports = router;