const _ = require('underscore');

const dal = require('../../dal/dal');

const logger = require('../../log/logger');

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
            // construct jwt - with permission claims & secret/id
            var userKey = uuid.v4();
            var issuedAt = new Date().getTime();
            var expiresAt = issuedAt + (EXPIRATION_TIME * 1000);
            var token = jwt.generate(user, params.deviceId, 
                                    userKey, issuedAt, expiresAt);
            // return to sender
            res.status(200).send(token);
        } else {
            res.status(403).send({error: 'Invalid credentials'});
        }
    })
    .catch(function (error) {
        logger.error(error.message, error);
    });
};

exports.getUserSecret = function(req, res) {

};

exports.userLogout = function(req, res) {

};
