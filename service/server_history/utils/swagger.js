const { version, description } = require('../../package.json');
const dotenv = require('dotenv').config();
const path = require('path');
const { TEST_HOST } = require("../../utils/consts");

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
				url: `http://${TEST_HOST}:${process.env.PORT_2}`,
				description: 'History User'
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
