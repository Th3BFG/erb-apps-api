const _ = require('underscore');
const jsrsasign = require('jsrsasign');
const logger = require('../log/logger');
const config = require('../configHandler');
const jtiFactory = require('../factories/jtiFactory');

const JWT_ENCODING_ALGORITHM = 'HS256';
const JWT_TYPE = 'JWT';
const JWT_SECRET_SEPARATOR = '.';

function JWTFactory() {
    this.secretKey = global.gConfig.secretKey;
};

JWTFactory.prototype.generate = function(user, deviceId, userKey, issuedAt, expiresAt) {
    if (!user.id || !user.username) {
        logger.error('user.id and user.username are required parameters');
        throw new Error('user.id and user.username are required parameters');
    }
    const header = {
        alg: JWT_ENCODING_ALGORITHM,
        typ: JWT_TYPE
    };
    const payload = {
        username: user.username,
        deviceId: deviceId,
        jti: jtiFactory.generateJTI(user.id, deviceId, issuedAt),
        iat: issuedAt,
        exp: expiresAt,
        perm: user.permissions 
    };
    const secret = this.getSecret(userKey);
    const token = jsrsasign.jws.JWS.sign(JWT_ENCODING_ALGORITHM,
                         JSON.stringify(header),
                         JSON.stringify(payload),
                         secret);
    
    return token;
}

JWTFactory.prototype.verify = function(token, userKey) {
    const secret = this.getSecret(userKey);
    const isValid = jsrsasign.jws.JWS.verifyJWT(token,
                                              secret,
                                              { alg: [JWT_ENCODING_ALGORITHM],
                                                verifyAt: new Date().getTime()});
    return isValid;
};

JWTFactory.prototype.getSecret = function(userKey) {
    return this.secretKey + JWT_SECRET_SEPARATOR + userKey;
};

module.exports = new JWTFactory();