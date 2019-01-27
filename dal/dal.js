const pgp = require('pg-promise')(/*options*/);
const config = require('../configHandler');
const logger = require('../log/logger');

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
    // TODO: Prepared statements or query factory
    logger.info('SELECT on ' + table);
    return db.any('SELECT ' + columns + ' FROM ' + table + ';')
};

exports.selectById = function(db, columns, table, id) {
    logger.info('SELECT on ' + table + ' WHERE ' + id);
    return db.one('SELECT ' + columns + ' FROM ' + table 
                    + ' WHERE id = ' + id + ';');
};

exports.insert = function(db, table, item) {
    // this one will be a bit more weird to generalize for now
    // Find properties of item
    const itemProps = Object.getOwnPropertyNames(item);
    let columns = "";
    let values = "";
    itemProps.forEach(function(element, idx, array) {
        columns += element;
        values += '\'' + item[element] + '\'';
        if(idx !== array.length -1) {
            columns += ',' 
            values +=  ',';
        }
    });
    logger.info('INSERT ' + item);
    return db.one('INSERT INTO ' + table + '(' 
                    + columns + ') VALUES (' + values 
                    + ') RETURNING id');
};

exports.delete = function(db, table, id) {
    logger.info('DELETE ' + id + ' FROM ' + table);
    return db.none('DELETE FROM ' + table 
                    + ' WHERE id = ' + id + ';');
};