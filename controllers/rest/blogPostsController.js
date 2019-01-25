//const BlogPost = require('../../models/blogPost');
const dal = require('../../dal/dal');

exports.blogPostList = function(req, res) {
    const db = dal.connect();
    dal.select(db, "*", "BlogPost")
    .then(function (data) {
        console.log('DATA:', data);
        res.status(200).send(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    })
};

exports.blogPostById = function(req, res) {
    const requestPostId = req.params['id'];
    // TODO: Return actual post
    res.send({ id: requestPostId });
};

exports.createBlogPost = function(req, res) {
    const db = dal.connect();
    
    const blogPost = {};
    blogPost.DatePosted = "2019-01-01";
    blogPost.Poster = "Ben";
    blogPost.Subject = "This is a tested creation.";
    blogPost.Body = "This is the body to a created test post."

    dal.insert(db, "BlogPost", blogPost);
    res.status(201).send(req.body);
};

exports.modifyBlogPost = function(req, res) {
    // TODO: modify post from request
    res.send(200, req.body);
};

exports.deleteBlogPost = function(req, res) {
    // TODO: delete post from request
    res.send(204);
};
