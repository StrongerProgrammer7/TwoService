# TwoService and NestJS

## Instruments

1) PostgreSQL - 15.6
2) Node - 20.12.2
3) npm - 10.5.0
4) nest - 10.3.2

## RUN TwoService

`cd service && npm i`

### ENV-Express

__Please create `.env` file in service/__

```USER_DB = your_user_postgres
PASSWORD = your_password_postgres
PORT_DB = your_port_for_db_postgres (standart 5432)
DATABASE = user_action_service_db
HOST = localhost

NODE_ENV = development (production without logger)
PORT_1 = 8000
PORT_2 = 8001
PORT_3 = 8002
```

### Database-Express

__If you not have psql (command in terminal) make:__

1) Open PostgreSQL (example pgAdmin4)
2) Copy content from ~/sql_scripts/dbUserService.sql
3) Put content to sql-query and execute
4) Analog for generate data ~/sql_scripts/generateUsers.sql
5) Well done, db,table,func,proc,view created!

__If you have psql command in terminal make:__

- `npm run init_db`
- `npm run generate_data`

### Start express

__This 2 services and use one swagger!__

first service use port 8000:

- Create user,change user, get users
- Choose in swagger localhost:8000

second service use port 8001:

- Save create/change use to history and get history by id user with limit and page
- Choose in swagger localhost:8001

third service - main service use port 8002:

without restart: `npm run start`
with restart: `npm run dev`

This using swagger GO: `http://localhost:8002/docs`

## RUN NestJS

`cd nestjs-project && npm i`

### ENV-NestJS

__Please create `.env` file in nestjs-project/__

```USER_DB = your_user_postgres
PASSWORD = your_password_postgres
PORT_DB = your_port_for_db_postgres (standart 5432)
DATABASE = user_action_service_db
HOST = localhost

NODE_ENV = development (production without logger)
PORT = 7000
```

### Database-NestJS

 For NestJS create database in postgre SQL

 `CREATE DATABASE user_action_service_db`

### Migration

Migration already exists, using: ` npm run migrate `

__If you want new migration you can generate__:
` npm run migration:gen ` __then add in func "up" next__

``` await queryRunner.query('
      INSERT INTO users (first_name, last_name, age, gender, has_problems)
      SELECT
        'FirstName' || i,
        'LastName' || i,
        (RANDOM() * 50 + 20)::INTEGER,
        CASE WHEN RANDOM() < 0.5 THEN 'Male' ELSE 'Female' END,
        CASE WHEN RANDOM() < 0.5 THEN true ELSE false END
      FROM generate_series(1, 1000000) s(i);
    ');
```

### Start nestjs

`npm run start`

with log

`npm run start:dev`

This using swagger, GO: `http://localhost:7000`
