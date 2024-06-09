const dotenv = require('dotenv').config();
const controller = require('./controller/controller');

const getOptionsServer = require('../utils/optionsServer');
const PORT_2 = process.env.PORT_2 || 5001;

const service_history = getOptionsServer(controller);


module.exports = { service_history, PORT_2 };
