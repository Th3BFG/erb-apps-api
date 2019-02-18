const redis = require('redis');
const uuid = require('uuid');
const promise = require('bluebird');
const jwtFactory = require('../factories/jwtFactory');
const jtiFactory = require('../factories/jtiFactory');
const config = require('../configHandler');
const logger = require('../log/logger');

promise.promisifyAll(redis);

function KeyService() {
    this.EXPIRATION_TIME = global.gConfig.tokenExpiration;
    this.client = redis.createClient(global.gConfig.redisPort, global.gConfig.redisServer);
    this.client.on('connect', function() {
        logger.info('Redis connected.');
    });
    logger.info('Connecting to Redis...');
};

KeyService.prototype.getToken = function(sessionKey) {
    return this.client.getAsync(sessionKey);
};
  
KeyService.prototype.createToken = function(user, deviceId) {
    // construct jwt with permission claims & secret/id
    const userKey = uuid.v4();
    const issuedAt = new Date().getTime();
    const expiresAt = issuedAt + (this.EXPIRATION_TIME * 1000);
    const token = jwtFactory.generate(user, deviceId, 
                            userKey, issuedAt, expiresAt);
    const key = jtiFactory.generateJTI(user.id, deviceId, issuedAt); 
    const setKey = this.client.setAsync(key, userKey);
    const setExpiration = setKey.then(this.client.expireAsync(key,
                                    this.EXPIRATION_TIME));
    return setExpiration.then(function() {
      return token;
    });
};
  
KeyService.prototype.deleteToken = function(sessionKey) {
    return this.client.delAsync(sessionKey);
};
  
module.exports = new KeyService();
