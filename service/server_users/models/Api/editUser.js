const ApiError = require("../../../HandleAPI/ApiError");
const DataApi = require("../../../HandleAPI/DataApi");
const errorHandler = require('./errorHandler');
const db = require('../connectWithDb');
const { isExistsUser } = require('./utils');
const axios = require('axios');

const edit_user = async (req, res, next) =>
{
	if (!req.params)
		return next(ApiError.badRequest("Request params is empty!"));

	const
		{
			id,
		} = req.params;
	if (!id)
		return next(ApiError.badRequest("Don't enought data!"));

	if (!req.body)
		return next(ApiError.badRequest("Request body is empty!"));
	const
		{
			name,
			email,
		} = req.body;
	if (!(name && email))
		return next(ApiError.badRequest("Don't enought data!"));

	if (await isExistsUser(db, email, id) === false)
		return next(DataApi.notlucky("User is not exists!"));

	db.query('CALL edituser($1,$2,$3)', [
		id,
		name,
		email,
	]).then(async () =>
	{
		console.log(id);
		await axios.post('http://localhost:8001/api/action_user', {
			id: id,
			action: 'edit',
			timestamp: new Date().toISOString(),
		});
		return next(DataApi.success({}, "User changed!"));
	})
		.catch(err =>
		{
			if (err.isAxiosError)
			{
				console.error("Axios error: ", err.message);
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
				console.error("Database error: ", err.message);
				errorHandler(
					"Error with edit user",
					["23503", "23502", ""],
					"User does not exist, check your data",
					"Internal error with edit user!",
					err,
					next
				);
			} else
			{
				console.error("Unknown error: ", err.message);
				errorHandler(
					"Unknown error",
					[],
					"An unknown error occurred",
					"Internal error!",
					err,
					next
				);
			}
			return next(ApiError.internal({}, "Failed to change user!"));
		});
};
module.exports = edit_user;
