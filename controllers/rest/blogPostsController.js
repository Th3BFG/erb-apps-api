const dal = require('../../dal/dal');
const logger = require('../../log/logger');

const TABLE_NAME = 'blogpost';

exports.blogPostList = function(req, res) {
    const db = dal.start();
    dal.select(db, '*', TABLE_NAME)
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
        logger.error(error.message, error);
    })
    .finally(function () {
        dal.end();
    });
};

exports.blogPostById = function(req, res) {
    const requestPostId = req.params['id'];
    // TODO: Return actual post
    res.send({ id: requestPostId });
};

exports.createBlogPost = function(req, res) {
    const db = dal.start();
    dal.insert(db, TABLE_NAME, req.body)
    .then(function (id) {
        res.status(201).send(id);
    })
    .catch(function (error) {
        logger.error(error.message, error);
    })
    .finally(function () {
        dal.end();
    });
};

exports.modifyBlogPost = function(req, res) {
    // TODO: modify post from request
    res.send(200, req.body);
};

exports.deleteBlogPost = function(req, res) {
    const db = dal.start();
    dal.delete(db, TABLE_NAME, req.params['id'])
    .then(function () { 
        res.sendStatus(204);
    })
    .catch(function (error) {
        logger.error(error.message, error);
    })
    .finally(function () {
        dal.end();
    });    
};
