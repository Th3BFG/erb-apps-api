const redis = require('redis');
const uuid = require('uuid');
const promise = require('bluebird');
const jwt = require('./jwt');
const logger = require('../log/logger');

promise.promisifyAll(redis);

function KeyService() {
    this.EXPIRATION_TIME = 86400; // TODO: Make configurable
    this.client = redis.createClient('6379', 'localhost');
    this.client.on('connect', function() {
        logger.info('Redis connected.');
    });
    logger.info('Connecting to Redis...');
}

KeyService.prototype.getToken = function(sessionKey) {
    return this.client.getAsync(sessionKey);
};
  
KeyService.prototype.createToken = function(user, deviceId) {
    // construct jwt - with permission claims & secret/id
    const userKey = uuid.v4();
    const issuedAt = new Date().getTime();
    const expiresAt = issuedAt + (this.EXPIRATION_TIME * 1000);
    const token = jwt.generate(user, deviceId, 
                            userKey, issuedAt, expiresAt);
    const key = user.id; // TODO: determine how to create key sessionKey(user.id, deviceId, issuedAt);
  
    const setKey = this.client.setAsync(key, userKey);
    const setExpiration = setKey.then(this.client.expireAsync(key,
                                    this.EXPIRATION_TIME));
    const addedToken = setExpiration.then(function() {
      return token;
    });
  
    return addedToken;
};
  
KeyService.prototype.deleteToken = function(sessionKey) {
    return this.client.delAsync(sessionKey);
};
  
module.exports = new KeyService();
