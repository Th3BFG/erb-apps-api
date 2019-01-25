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
    return db.any('SELECT ' + columns + ' FROM ' + table + ';')
};

exports.selectById = function(db, columns, table, id) {
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
    db.none('INSERT INTO ' + table + '(' + columns + ') VALUES (' + values + ')');
};

exports.delete = function(db, table, id) {
    return db.none('DELETE FROM ' + table + ' WHERE id = ' 
                        + id + ';');
};