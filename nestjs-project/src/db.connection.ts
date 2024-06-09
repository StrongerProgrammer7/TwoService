// data-source.ts
import { config } from "dotenv";
import { DataSource } from 'typeorm';
config();

export const databaseConnection = new DataSource(
	{
		type: 'postgres',
		host: process.env.HOST || 'localhost',
		port: Number(process.env.PORT_DB) || 5432,
		username: process.env.USER_DB || "postgres",
		password: process.env.PASSWORD || "postgres",
		database: process.env.DATABASE || 'user_action_service_db',
	}
);
