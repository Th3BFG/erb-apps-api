const express = require('express');
const router = express.Router();
const logger = require('../log/logger');

// Controllers
logger.info("Loading Blog Controllers");
const blogPostController = require('../controllers/rest/blogPostsController');

// Blog Post Routes
logger.info("Assigning Blog Post routes.");
router.get('/posts', blogPostController.blogPostList);
router.get('/posts/:id', blogPostController.blogPostById);
router.post('/posts', blogPostController.createBlogPost);
router.put('/posts/:id', blogPostController.modifyBlogPost);
router.delete('/posts/:id', blogPostController.deleteBlogPost);

module.exports = router;