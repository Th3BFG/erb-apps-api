const _ = require('underscore');
const dal = require('../../dal/dal');
const logger = require('../../log/logger');

const TABLE_NAME = 'blogpost';

exports.blogPostList = function(req, res) {
    dal.select('*', TABLE_NAME)
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
        logger.error(error.message, error);
    });
};

exports.blogPostById = function(req, res) {
    dal.selectById('*', TABLE_NAME, req.params['id'])
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
        logger.error(error.message, error);
    });
};

exports.createBlogPost = function(req, res) {
    if(_.contains(req.perm, 'blogPost:create')) {
        dal.insert(TABLE_NAME, req.body)
        .then(function (id) {
            res.status(201).send(id);
        })
        .catch(function (error) {
            logger.error(error.message, error);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.modifyBlogPost = function(req, res) {
    if(_.contains(req.perm, 'blogPost:modify')) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

exports.deleteBlogPost = function(req, res) {
    if(_.contains(req.perm, 'blogPost:delete')) {
        dal.delete(TABLE_NAME, req.params['id'])
        .then(function () { 
            res.sendStatus(204);
        })
        .catch(function (error) {
            logger.error(error.message, error);
        });    
    } else {
        res.sendStatus(403);
    }
};
