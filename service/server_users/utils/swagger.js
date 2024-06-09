const { version, description } = require('../../package.json');
const dotenv = require('dotenv').config();
const path = require('path');
const TEST_URL = 'localhost';

const options =
{
	definition:
	{
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
				url: `http://${TEST_URL}:${process.env.PORT_1}`,
				description: 'User server'
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
	apis: [path.resolve(__dirname, '../models/Api/docs/*.yaml')],
};

module.exports = options;
