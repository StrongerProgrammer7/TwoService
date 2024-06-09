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

SELECT 'CREATE DATABASE user_action_service_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'user_action_service_db')\gexec
CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        gender VARCHAR(10) NOT NULL,
        has_problems BOOLEAN NOT NULL
      );


INSERT INTO users (first_name, last_name, age, gender, has_problems)
      SELECT
        'FirstName' || i,
        'LastName' || i,
        (RANDOM() * 50 + 20)::INTEGER,
        CASE WHEN RANDOM() < 0.5 THEN 'Male' ELSE 'Female' END,
        CASE WHEN RANDOM() < 0.5 THEN true ELSE false END
      FROM generate_series(1, 1000000) s(i);
