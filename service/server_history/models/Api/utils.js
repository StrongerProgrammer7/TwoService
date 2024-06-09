const db = require('../connectWithDb');

async function isExistsUser(db, email, id = null)
{
	let data;
	if (!id)
		data = await db.query("SELECT * from users WHERE email LIKE $1;", [email]);
	else
		data = await db.query("SELECT * from users WHERE id = $1;", [id]);
	if (data.rows.length === 0)
	{
		return false;
	}
	return true;
}

module.exports = { isExistsUser };
