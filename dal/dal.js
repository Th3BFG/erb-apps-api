const config = require('../configHandler');
const logger = require('../log/logger');
const Promise = require('bluebird');

// construct pg-promise options
const initOptions = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(initOptions);

exports.start = function() {
    logger.info("Creating connection object.");
    return pgp('postgres://' + global.gConfig.dbUser
        + ':' + global.gConfig.dbPassword 
        + '@' + global.gConfig.dbHost 
        + ':' + global.gConfig.dbPort 
        + '/' + global.gConfig.dbName );
};

exports.end = function () {
    logger.info("Releasing connection object.");
    pgp.end();
}

exports.select = function(db, columns, table) {
    logger.info('SELECT on ' + table + ' with ' + columns);
    return db.any('SELECT $1~ FROM $2~;', [columns, table]);
};

exports.selectById = function(db, columns, table, id) {
    logger.info('SELECT on ' + table + ' with ' + columns + ' WHERE ' + id);
    return db.one('SELECT $1~ FROM $2~ WHERE id = $3;', [columns, table, id]);
};

exports.insert = function(db, table, item) {
    logger.info('INSERT INTO ' + table);
    return db.one('INSERT INTO $1~($2~) VALUES ($2:csv) RETURNING id;', [table, item]);
};

exports.delete = function(db, table, id) {
    logger.info('DELETE ' + id + ' FROM ' + table);
    return db.none('DELETE FROM $1~ WHERE id = $2;', [table, id]);
};