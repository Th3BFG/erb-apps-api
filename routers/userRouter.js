const express = require('express');
const router = express.Router();
const logger = require('../log/logger');

// Controllers
logger.info("Loading User Controllers");
const userController = require('../controllers/rest/userController');

// User Routes
logger.info("Assigning User routes.");
router.post('/users', userController.userLogin);
router.get('/users/:id', userController.getUserSecret);
router.delete('users/:id', userController.userLogout);

module.exports = router;