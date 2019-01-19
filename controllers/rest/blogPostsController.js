const BlogPost = require('../../models/blogPost');

exports.blogPostList = function(req, res) {
    // connect to DB
    // pull list of blogPosts
    // return
    res.send([{id: '1', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 1', post_body: 'Test Body 1 with some content.'},
        {id: '2', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 2', post_body: 'Test Body 2 with some content.'},
        {id: '3', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 3', post_body: 'Test Body 3 with some content.'},
        {id: '4', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 4', post_body: 'Test Body 4 with some content.'},
        {id: '5', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 5', post_body: 'Test Body 5 with some content.'},
        {id: '6', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 6', post_body: 'Test Body 6 with some content. Courtney does care'},
    ]);
};

exports.blogPostById = function(req, res) {
    const requestPostId = req.params['id'];
    // TODO: Return actual post
    res.send({ id: requestPostId });
};

exports.createBlogPost = function(req, res) {
    // TODO: Create post from request
    res.send(201, req.body);
};

exports.modifyBlogPost = function(req, res) {
    // TODO: modify post from request
    res.send(200, req.body);
};

exports.deleteBlogPost = function(req, res) {
    // TODO: delete post from request
    res.send(204);
};
