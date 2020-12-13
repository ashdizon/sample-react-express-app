
-- Add user
DELIMITER //
CREATE PROCEDURE add_user(
    IN username VARCHAR(16),
    IN password VARCHAR(16)
)
BEGIN
    INSERT INTO users(username, password)
    VALUES(username, password);
END //
DELIMITER ;

-- Get user
DELIMITER //
CREATE PROCEDURE get_user(
    IN user VARCHAR(16),
    IN pwd VARCHAR(16)
)
BEGIN
    SELECT * FROM users WHERE username=user AND password=pwd;
END //
DELIMITER ;

-- Update user
DELIMITER //
CREATE PROCEDURE update_user(
    IN user_id INT,
    IN user VARCHAR(16),
    IN pwd VARCHAR(16)
)
BEGIN
    SET autocommit = 0;
    CALL logout(user_id);
    UPDATE users SET username=user, password=pwd WHERE id=user_id;
    COMMIT;
END //
DELIMITER ;

-- Delete user
DELIMITER //
CREATE PROCEDURE delete_user(
    IN usr_id INT
)
BEGIN
    SET autocommit = 0;
    DELETE FROM messages WHERE user_id=usr_id;
    CALL logout(usr_id);
    DELETE FROM users WHERE id=usr_id;
    COMMIT;
END //
DELIMITER ;

-- Login
DELIMITER //
CREATE PROCEDURE login(
    IN user_id INT,
    IN tkn VARCHAR(512)
)
BEGIN
    INSERT INTO login VALUES (user_id, tkn, NOW())
    ON DUPLICATE KEY UPDATE token=tkn, updated=NOW();
END //
DELIMITER ;

-- Is Logged In
DELIMITER //
CREATE PROCEDURE is_logged_in(
    IN tkn VARCHAR(512)
)
BEGIN
    SELECT * FROM login where token=tkn;
END //
DELIMITER ;

-- Logout
DELIMITER //
CREATE PROCEDURE logout(
    IN user_id INT
)
BEGIN
    DELETE FROM login WHERE id=user_id;
END //
DELIMITER ;

-- Create Message
DELIMITER //
CREATE PROCEDURE create_message (
    IN usr_id INT,
    IN msg VARCHAR(256)
)
BEGIN
    INSERT INTO messages(message, user_id, created, updated)
    VALUES (msg, usr_id, NOW(), NOW());
END //
DELIMITER ;

-- Edit Message
DELIMITER //
CREATE PROCEDURE edit_message (
    IN msg_id INT,
    IN usr_id INT,
    IN msg VARCHAR(256)
)
BEGIN
    UPDATE messages SET message=msg, updated=NOW()
    WHERE id=msg_id AND user_id=usr_id;
END //
DELIMITER ;

-- Delete Message
DELIMITER //
CREATE PROCEDURE delete_message (
    IN msg_id INT,
    IN usr_id INT
)
BEGIN
    DELETE
    FROM 
        messages
    WHERE
        id=msg_id
    AND
        user_id=usr_id;
END //
DELIMITER ;

-- Get All Messages
DELIMITER //
CREATE PROCEDURE get_all_messages (
    IN base INT,
    IN num INT
)
BEGIN
    SELECT
        messages.id,
        message,
        created,
        updated,
        user_id,
        username
    FROM
        messages
    INNER JOIN users ON users.id=user_id
    ORDER BY
        id DESC
    LIMIT
        base, num;
END //
DELIMITER ;

-- Get user Messages
DELIMITER //
CREATE PROCEDURE get_user_messages (
    IN usr_id INT,
    IN base INT,
    IN num INT
)
BEGIN
    SELECT
        messages.id,
        message,
        created,
        updated,
        user_id,
        username
    FROM
        messages
    INNER JOIN users ON users.id=user_id
    WHERE
        user_id=usr_id
    ORDER BY
        id DESC
    LIMIT
        base, num;
END //
DELIMITER ;