const _ = require('underscore');
const crypto = require('crypto');
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
        if(user === null) { res.status(403).send('Invalid credentials'); }
        // Validate Credentials
        const hash = crypto.createHmac('sha256', user.salt);
        if(user.password = hash.update(params.password).digest('hex')) {
            res.status(200).send('yeet');
        }
        
        // const passMatch = user.comparePassword(params.password);
        // construct jwt - with permission claims & secret/id
        // return to sender
    })
    .catch(function (error) {
        logger.error(error.message, error);
    });
};