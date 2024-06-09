const ApiError = require("../../../HandleAPI/ApiError");
const DataApi = require("../../../HandleAPI/DataApi");
const errorHandler = require('./errorHandler');
const db = require('../connectWithDb');
const { isExistsUser } = require('./utils');

const edit_user = async (req, res, next) =>
{


	db.query('SELECT * FROM public.get_users').then((result) =>
	{
		console.log(result.rows);
		return next(DataApi.success(result.rows, "Success!"));
	})
		.catch(err =>
		{
			errorHandler(
				"Error with get user",
				[],
				"",
				"Internal error with get user!",
				err,
				next
			);
		});
};
module.exports = edit_user;
