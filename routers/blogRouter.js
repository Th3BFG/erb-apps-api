const express = require('express');
const router = express.Router();
// Controllers
const blogPostController = require('../controllers/rest/blogPostsController');

// Blog Post Routes
router.get('/posts', blogPostController.blogPostList);
router.get('/posts/:id', blogPostController.blogPostById);
router.post('/posts', blogPostController.createBlogPost);
router.put('/posts/:id', blogPostController.modifyBlogPost);
router.delete('/posts/:id', blogPostController.deleteBlogPost);

module.exports = router;