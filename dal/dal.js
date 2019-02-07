const config = require('../configHandler');
const logger = require('../log/logger');
const db = require('./db');

exports.select = function(columns, table) {
    logger.info('SELECT on ' + table + ' with ' + columns);
    return db.any('SELECT $1~ FROM $2~;', [columns, table]);
};

exports.selectById = function(columns, table, id) {
    logger.info('SELECT on ' + table + ' with ' + columns + ' WHERE ' + id);
    return db.oneOrNone('SELECT $1~ FROM $2~ WHERE id = $3;', [columns, table, id]);
};

exports.selectBySearchTerm = function(columns, table, term, value) {
    logger.info('SELECT on ' + table + ' with ' + columns + ' WHERE ' + value);
    return db.oneOrNone('SELECT $1~ FROM $2~ WHERE $3~ = $4;', [columns, table, term, value]);
};

exports.insert = function(table, item) {
    logger.info('INSERT INTO ' + table);
    return db.one('INSERT INTO $1~($2~) VALUES ($2:csv) RETURNING id;', [table, item]);
};

exports.delete = function(table, id) {
    logger.info('DELETE ' + id + ' FROM ' + table);
    return db.none('DELETE FROM $1~ WHERE id = $2;', [table, id]);
};