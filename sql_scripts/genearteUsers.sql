DELETE FROM history_action;
DELETE FROM users;

DO $$
DECLARE
  user_id INTEGER;
BEGIN
  FOR i IN 1..5000 LOOP  
    INSERT INTO users (name, email)
    VALUES (
      'User ' || i,
      'user' || i || '@example.com'
    )
    RETURNING id INTO user_id;
    INSERT INTO history_action (user_id, action, timestamp)
	VALUES (user_id, 'create',NOW() - (random() * interval '365 days'));
 
    FOR j IN 1..20 LOOP  
      INSERT INTO history_action (user_id, action, timestamp)
      VALUES (
        user_id,
        'edit', 
        NOW() - (random() * interval '365 days')  
      );
    END LOOP;
  END LOOP;
END $$;
