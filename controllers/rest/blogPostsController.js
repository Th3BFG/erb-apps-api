//const BlogPost = require('../../models/blogPost');
const dal = require('../../dal/dal');

exports.blogPostList = function(req, res) {
    var db = dal.connect();
    dal.select(db, "*", "BlogPost")
    .then(function (data) {
        console.log('DATA:', data);
        res.status(200).send(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
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
