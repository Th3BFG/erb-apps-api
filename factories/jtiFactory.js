const _ = require('underscore');
const uuidv5 = require('uuid/v5');
const logger = require('../log/logger');
const config = require('../configHandler');

function JTIFactory() { };

JTIFactory.prototype.generateJTI = function(userId, deviceId, issuedAt) {
    return uuidv5(userId + deviceId + issuedAt, uuidv5.DNS);
};

module.exports = new JTIFactory();