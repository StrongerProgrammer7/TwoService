const ApiError = require("../../../HandleAPI/ApiError");
const DataApi = require("../../../HandleAPI/DataApi");
const errorHandler = require('./errorHandler');
const db = require('../connectWithDb');
const { isExistsUser } = require('./utils');

const action_user = async (req, res, next) =>
{
	console.log(req.body);
	if (!req.body)
		return next(ApiError.badRequest("Request body is empty!"));
	const
		{
			id,
			action,
			timestamp,
		} = req.body;
	console.log(req.body);
	if (!(id && action && timestamp))
		return next(ApiError.badRequest("Don't enought data!"));

	if (await isExistsUser(db, "", id) === false)
		return next(DataApi.notlucky("User is exists!"));

	db.query('CALL actionuser($1,$2,$3)', [
		id,
		action,
		timestamp,
	]).then(() =>
	{
		return next(DataApi.success(undefined, "Saved record!"));
	})
		.catch(err =>
		{
			errorHandler(
				"Error with history ",
				[],
				"",
				"Internal error with save action user!",
				err,
				next
			);
		});
};
module.exports = action_user;
