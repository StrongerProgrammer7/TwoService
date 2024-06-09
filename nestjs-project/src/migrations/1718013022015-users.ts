import { MigrationInterface,QueryRunner } from "typeorm";

export class Users1718013022015 implements MigrationInterface
{
    name = 'Users1718013022015';

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "age" integer NOT NULL, "gender" character varying(10) NOT NULL, "has_problems" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);

        await queryRunner.query(`
      INSERT INTO users (first_name, last_name, age, gender, has_problems)
      SELECT
        'FirstName' || i,
        'LastName' || i,
        (RANDOM() * 50 + 20)::INTEGER,
        CASE WHEN RANDOM() < 0.5 THEN 'Male' ELSE 'Female' END,
        CASE WHEN RANDOM() < 0.5 THEN true ELSE false END
      FROM generate_series(1, 1000000) s(i);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
