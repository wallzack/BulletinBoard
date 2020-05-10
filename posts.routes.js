const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller');

router.get('/', posts.loadAll);