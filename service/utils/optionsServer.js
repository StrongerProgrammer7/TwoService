const express = require('express');
const expressWinston = require('express-winston');
const cors = require('cors');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//security
const helmet = require('helmet');
const toobusy = require('toobusy-js');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const logger = require('../logger/logger');
const loggerInernalError = require('../logger/loggerInernalError');
const errorHandler = require('../middleware/HandlingMiddleware');

function getOptionsServer(controller)
{
	const urlencodedParser = express.urlencoded({ extended: true });

	const app = express();

	app.use(expressWinston.logger(
		{
			winstonInstance: logger,
			statusLevels: true
		}
	));

	app.use(expressWinston.errorLogger(
		{
			winstonInstance: loggerInernalError
		}
	));

	// app.all('*', function (req, res, next)
	// {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// 	next();
	// });

	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(fileUpload());

	app.use(cors({ origin: ['http://localhost:8002', 'http://localhost:5000', 'http://localhost:5173', 'http://localhost:3000'], credentials: true }));

	app.use(function (req, res, next)
	{
		//res.header('Content-Type', 'application/json;charset=UTF-8');
		res.header('Access-Control-Allow-Credentias', true);
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		next();
	});
	app.use('/api', controller);
	app.use(errorHandler);
	app.use(urlencodedParser);
	app.use(helmet());

	app.use(function (req, res, next)
	{
		if (toobusy())
		{
			res.send(503, 'Server too busy!');
		} else
		{
			next();
		}
	});

	const rateLimiterApi = rateLimit(
		{
			windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
			max: 300000, // maximum number of request inside a window
			message: "You have exceeded the 100 requests in 24 hrs limit!", // the message when they exceed limit
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		});
	app.use('/api', rateLimiterApi);

	app.use(xss());

	return app;
}

module.exports = getOptionsServer;
