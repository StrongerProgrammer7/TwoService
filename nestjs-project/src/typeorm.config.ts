import { databaseConnection } from "./db.connection";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource(
	{
		...databaseConnection.options,
		entities: ["*/**/*.entity.ts"],
		migrations: ["src/migrations/*.ts"]
	}
);

AppDataSource.initialize()
	.then(() =>
	{
		console.log("Data source has been initialized!");
	})
	.catch((error) =>
	{
		console.log("Error during Data Source initialization",error);
	});

export default AppDataSource;
