const ApiError = require("../../../HandleAPI/ApiError");
const DataApi = require("../../../HandleAPI/DataApi");
const errorHandler = require('./errorHandler');
const db = require('../connectWithDb');

const get_history_user = async (req, res, next) =>
{
	if (!req.params)
		return next(ApiError.badRequest("Request params is empty!"));

	const
		{
			id,
		} = req.params;
	if (!id)
		return next(ApiError.badRequest("Request params required id user"));
	const
		{
			page = 1,
			limit = 10
		} = req.query;
	const offset = (page - 1) * limit;

	db.query('SELECT * FROM history_action WHERE user_id = $1 LIMIT $2 OFFSET $3', [id, limit, offset])
		.then((result) =>
		{
			return next(DataApi.success(result.rows, "Success"));
		})
		.catch(err =>
		{
			errorHandler(
				"Error with get user's history",
				["42P01"],
				"Erorr with select maybe user doesn't exists",
				"Internal error with get history",
				err,
				next
			);
		});
};
module.exports = get_history_user;
