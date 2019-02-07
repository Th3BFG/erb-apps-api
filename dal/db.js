const config = require('../configHandler');
const logger = require('../log/logger');
const Promise = require('bluebird');

const pgp = require('pg-promise')({
    // construct pg-promise options
    promiseLib: Promise
});
logger.info("Creating connection details.");
const cd = 'postgres://' + global.gConfig.dbUser
        + ':' + global.gConfig.dbPassword 
        + '@' + global.gConfig.dbHost 
        + ':' + global.gConfig.dbPort 
        + '/' + global.gConfig.dbName;
logger.info("Creating connection object.");
const db = pgp(cd);

module.exports = db;