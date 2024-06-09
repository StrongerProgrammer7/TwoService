SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SELECT 'CREATE DATABASE userservice'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'userservice')\gexec

\c userservice

CREATE OR REPLACE FUNCTION validateEmail(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT email_format_check CHECK (validateEmail(email))
);

CREATE TABLE IF NOT EXISTS history_action (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  action VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TYPE user_info_type AS (
    userId INT,
    name_res TEXT,
    email_res TEXT
);

DROP FUNCTION IF EXISTS public.insertuser(text, text);

CREATE OR REPLACE FUNCTION public.insertuser(
    IN name_param TEXT,
    IN email_param TEXT)
RETURNS user_info_type
LANGUAGE plpgsql
AS $BODY$
DECLARE
	user_info user_info_type; 
BEGIN
    INSERT INTO users (name, email)
    VALUES (name_param, email_param)
    RETURNING id,name,email INTO user_info; 

    RETURN  user_info;
END;
$BODY$;


DROP PROCEDURE IF EXISTS public.edituser(text, text);

CREATE OR REPLACE PROCEDURE public.edituser(
	IN id_user INT,
    IN name_param TEXT,
    IN email_param TEXT)
LANGUAGE plpgsql
AS $BODY$
BEGIN
    UPDATE users SET name = name_param, email = email_param
    WHERE id = id_user;
END;
$BODY$;

DROP PROCEDURE IF EXISTS public.actionuser(text, text);

CREATE OR REPLACE PROCEDURE public.actionuser(
	IN user_id INT,
    IN action_param VARCHAR,
    IN timestamp_param TIMESTAMP)
LANGUAGE plpgsql
AS $BODY$
BEGIN
    INSERT INTO history_action (user_id,"action","timestamp")
    VALUES (user_id, action_param,timestamp_param);
END;
$BODY$;


DROP VIEW public.get_users;

CREATE OR REPLACE VIEW public.get_users
 AS
 SELECT name,
    email
   FROM users;

ALTER TABLE public.get_users
    OWNER TO postgres;
