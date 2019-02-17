const _ = require('underscore');
const crypto = require('crypto');
const dal = require('../../dal/dal');
const logger = require('../../log/logger');
const keyService = require('../../helpers/keyService');
const TABLE_NAME = 'user';

exports.userLogin = function(req, res) {
    // TODO: pull logic into appropriate services.
    const params = _.pick(req.body, 'username', 'password', 'deviceId');
    if (!params.username || !params.password || !params.deviceId) {
        logger.error('Required parameters: username, password and deviceId');
        res.status(400).send({error: 'Required parameters: username, password and deviceId'});
    }

    // Retrieve the user if possible
    dal.selectBySearchTerm('*', TABLE_NAME, 'username', params.username)
    .then(function (user) {
        if(_.isNull(user)) { res.status(403).send({error: 'Invalid credentials'}); }
        // Validate Credentials
        const hash = crypto.createHmac('sha256', user.salt);
        if(user.password === hash.update(params.password).digest('hex')) {
            keyService.createToken(user, params.deviceId).then(function(token) {
                // return to sender
                res.status(200).send(token);
            });
        } else {
            res.status(403).send({error: 'Invalid credentials'});
        }
    })
    .catch(function (error) {
        logger.error(error.message, error);
    });
};

exports.getUserSecret = function(req, res) {
    const params = _.pick(req.params, 'id');
    if (!params.id) {
        logger.error('Required parameters: id');
        res.status(400).send({error: 'Required parameters: id'});
    }
    keyService.getToken(params.id).then(function(secret) {
        res.status(200).send(secret);
    });
};

exports.userLogout = function(req, res) {
    res.sendStatus(200);
};
