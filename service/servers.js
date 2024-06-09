const express = require("express");
const dotenv = require('dotenv').config();
const { service_users, PORT_1, optionsSwagger } = require("./server_users/app");
const { service_history, PORT_2, optionSwaggerHistory } = require("./server_history/app");
const swaggerDocs = require("./utils/swagger");
const PORT = process.env.PORT_3 || 5002;

const app = express();
swaggerDocs(app, PORT);


const startServer = async (PORT, app) =>
{
	try
	{
		app.listen(PORT, () =>
		{
			if (PORT === (process.env.PORT_3 || 5002))
				console.log(`Server-swagger has been started on port ${PORT} and env=${process.env.NODE_ENV}`);
			else
				console.log(`Server has been started on port ${PORT} and env=${process.env.NODE_ENV}`);

		});

	} catch (error)
	{
		console.error(`Unable to connect to the server(http): PORT=${PORT}`);
		console.error(error);
	}
};

startServer(PORT_1, service_users);
startServer(PORT_2, service_history);
startServer(PORT, app); 
