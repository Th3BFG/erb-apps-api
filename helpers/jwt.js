const _ = require('underscore');
const jsrsasign = require('jsrsasign');
const base64url = require('base64url');
const logger = require('../log/logger');

const JWT_ENCODING_ALGORITHM = 'HS256';
const JWT_SECRET_SEPARATOR = '.';

function JWT() {
    // TODO: Randomize?
    this.secretKey = '';
}

JWT.prototype.generate = function (user, deviceId, userKey, issuedAt, expiresAt) {
    if (!user.id || !user.username) {
        logger.error('user.id and user.username are required parameters');
        throw new Error('user.id and user.username are required parameters');
    }
    const header = {
        alg: JWT_ENCODING_ALGORITHM,
        typ: 'JWT'
    };
    const payload = {
        username: user.username,
        deviceId: deviceId,
        jti: '', // TODO: Determine how to get token keys
        iat: issuedAt,
        exp: expiresAt,
        perm: user.perm 
    };
    const secret = this.secretKey + JWT_SECRET_SEPARATOR + userKey;
    const token = jsrsasign.jws.JWS.sign(JWT_ENCODING_ALGORITHM,
                         JSON.stringify(header),
                         JSON.stringify(payload),
                         secret);
    
    return token;
}

module.exports = new JWT();