const base64url = require('base64url');
const jwtFactory = require('../factories/jwtFactory');
const keyService = require('./keyService');
const logger = require('../log/logger');

function isAuthenticated(req, res, next) {
    const authorization = req.headers.authorization;
    if(!authorization || !(authorization.search('Bearer ') === 0)) {
        // TODO: clean up error handling
        logger.error('401 Missing Authorization Header');
        return next(new Error('401 Missing Authorization Header'));
    }
    const token = authorization.split(' ')[1];
    if(!token) {
        logger.error('401 Missing Bearer Token');
        return next(new Error('401 Missing Bearer Token'));
    }

    // Unpack JWT for JTI
    const components = token.split('.');
    const payload = JSON.parse(base64url.decode(components[1]));

    // Verify JWT
    keyService.getToken(payload.jti).then(function(userKey) {
        const authenticated = jwtFactory.verify(token, userKey);
        if (authenticated) { 
            req.perm = payload.perm.split(';');
            return next(); 
        }
        logger.error('403 Invalid Access Token');
        return next(new Error('403 Invalid Access Token'));
    });
}

module.exports = {
    isAuthenticated: isAuthenticated
};