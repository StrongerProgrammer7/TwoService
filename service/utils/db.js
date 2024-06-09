const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();

const pool = new Pool(
	{
		user: process.env.USER_DB,
		password: process.env.PASSWORD,
		host: process.env.HOST,
		port: Number(process.env.PORT_DB) || 5432,
		database: process.env.DATABASE
	}
);


module.exports = pool;
