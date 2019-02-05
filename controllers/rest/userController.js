const dal = require('../../dal/dal');
const logger = require('../../log/logger');

const TABLE_NAME = 'user';

exports.userList = function(req, res) {
    const db = dal.start();
    dal.select(db, '*', TABLE_NAME)
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
        logger.error(error.message, error);
    })
    .finally(function () {
        dal.end();
    });
};