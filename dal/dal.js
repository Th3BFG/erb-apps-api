const pgp = require('pg-promise')(/*options*/);
const config = require('../configHandler');

exports.connect = function() {
    return pgp('postgres://' + global.gConfig.dbUser
        + ':' + global.gConfig.dbPassword 
        + '@' + global.gConfig.dbHost 
        + ':' + global.gConfig.dbPort 
        + '/' + global.gConfig.dbName );
};

exports.select = function(db, columns, table) {
    // TODO: Prepared statements or query factory
    return db.any('SELECT ' + columns + ' FROM "' + table + '"')
};
