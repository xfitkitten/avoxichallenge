const pino = require('pino');
const fs = require('fs');

const logFile = fs.createWriteStream('./logs/general.log', { flags: 'a' });

module.exports = pino({}, logFile);
