const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { version, description } = require('../package.json');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const dotenv = require('dotenv').config();
const path = require('path');
const { TEST_HOST } = require("./consts");

const options =
{
	definition:
	{
		url: `http://${TEST_HOST}:${process.env.PORT_1}/docs`,
		openapi: '3.0.0',
		info:
		{
			title: 'UserService API Docs',
			version,
			description,
			contact: {
				name: "Abduykov Z",
				email: "swat55551@gmail.com",
				url: "https://github.com/StrongerProgrammer7"
			},
		},
		servers: [
			{
				url: `http://${TEST_HOST}:${process.env.PORT_1}`,
				description: 'Service User'
			},
			{
				url: `http://${TEST_HOST}:${process.env.PORT_2}`,
				description: 'Service History'
			}
		],
		components:
		{
			securitySchemas:
			{
				bearerAuth:
				{
					type: 'http',
					scheme: 'bearer',
					bearerFormat: "JWT"
				},
			},
		},
		security: [
			{
				bearerAuth: [],

			},
		],
	},
	apis: [path.resolve(__dirname, '../server_users/models/Api/docs/*.yaml'), path.resolve(__dirname, '../server_history/models/Api/docs/*.yaml')],
};


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port)
{
	//Page
	app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

	//Json

	app.get(`/docs.json`, csrfProtection, (req, res, next) =>
	{
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	console.log(`Docs available at http://${TEST_HOST}:${port}/docs`);
};

module.exports = swaggerDocs;
