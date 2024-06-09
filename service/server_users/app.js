const dotenv = require('dotenv').config();
const controller = require('./controller/controller');

const getOptionsServer = require('../utils/optionsServer');
const PORT_1 = process.env.PORT_1 || 5000;

const service_users = getOptionsServer(controller);

module.exports = { service_users, PORT_1 };
