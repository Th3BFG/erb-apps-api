const config = require('./config.json');

const envSetting = process.env.NODE_ENV || 'development';
const configToUse = config[envSetting];

// Set global variable with Config object
global.gConfig = configToUse;