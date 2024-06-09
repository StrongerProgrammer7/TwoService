const ApiError = require("../../../HandleAPI/ApiError");
const DataApi = require("../../../HandleAPI/DataApi");
const errorHandler = require('./errorHandler');
const db = require('../connectWithDb');
const { isExistsUser } = require('./utils');
const axios = require('axios');

const create_user = async (req, res, next) =>
{
	if (!req.body)
		return next(ApiError.badRequest("Request body is empty!"));
	const
		{
			name,
			email,
		} = req.body;
	if (!(name && email))
		return next(ApiError.badRequest("Don't enought data!"));

	if (await isExistsUser(db, email))
		return next(DataApi.notlucky("User is exists!"));

	db.query('SELECT * FROM insertuser($1,$2)', [
		name,
		email,
	]).then(async (result) =>
	{
		const user = result.rows[0];
		await axios.post('http://localhost:8001/api/action_user', {
			id: user.userid,
			action: 'create',
			timestamp: new Date().toISOString(),
		});
		return next(DataApi.success(undefined, "User created!"));
	})
		.catch(err =>
		{
			if (err.isAxiosError)
			{
				errorHandler(
					"Error with external API request",
					[],
					"Failed to send data to the action user service",
					"Internal error with external API request!",
					err,
					next
				);
			} else if (err.code)
			{
				errorHandler(
					"Error with create user",
					["23505"],
					"User is exists check your data",
					"Internal error with create user!",
					err,
					next
				);
			} else
			{
				errorHandler(
					"Unknown error",
					[],
					"An unknown error occurred",
					"Internal error!",
					err,
					next
				);
			}
			return next(ApiError.internal({}, "Failed to create user!"));
		});
};
module.exports = create_user;
