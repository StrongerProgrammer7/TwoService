DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = 'userservice'
    ) THEN
        RAISE EXCEPTION 'Database "userservice" does not exist';
    END IF;
END $$;

\c UserService

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS history_action;
DROP FUNCTION IF EXISTS public.insertuser(text, text);
DROP PROCEDURE IF EXISTS public.edituser(text, text);
DROP VIEW public.get_users;
