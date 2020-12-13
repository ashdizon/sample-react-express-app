CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(16) NOT NULL
);

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(256) NOT NULL,
    user_id INT,
    created DATETIME NOT NULL,
    updated DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE login (
    id INT PRIMARY KEY,
    token VARCHAR(512) NOT NULL,
    updated DATETIME NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id)
);

