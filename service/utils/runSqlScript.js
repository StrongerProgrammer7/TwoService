const { execSync } = require('child_process');

async function initDB() 
{
	try
	{
		const username = process.argv[2];
		const filePath = process.argv[3];

		if (!username || !filePath)
			throw new Error('Usage: npm run run_sql <username> <file_path>');

		const command = `psql -U ${username} -f ${filePath} -h localhost -p 5432`;

		execSync(command, { stdio: 'inherit' });

		console.log('Database initialized successfully.');
	} catch (error)
	{
		console.error('Error initializing database:', error.message);
		process.exit(1);
	}
}

initDB();
