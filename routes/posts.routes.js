const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller');

router.get('/posts', posts.loadAll);
router.post('/posts', posts.addPost);

module.exports = router;