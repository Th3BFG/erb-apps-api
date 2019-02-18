const express = require('express');
const router = express.Router();
const logger = require('../log/logger');
const authMiddleware = require('../helpers/authMiddleware');

// Controllers
logger.info("Loading Blog Controllers");
const blogPostController = require('../controllers/rest/blogPostsController');

// Blog Post Routes
logger.info("Assigning Blog Post routes.");
router.get('/posts', blogPostController.blogPostList);
router.get('/posts/:id', blogPostController.blogPostById);
router.post('/posts', authMiddleware.isAuthenticated, blogPostController.createBlogPost);
router.put('/posts/:id', authMiddleware.isAuthenticated, blogPostController.modifyBlogPost);
router.delete('/posts/:id', authMiddleware.isAuthenticated, blogPostController.deleteBlogPost);

module.exports = router;