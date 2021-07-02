--users table
CREATE TABLE users (
    id INTEGER,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY(id)
    );
CREATE UNIQUE INDEX username ON users (username);

CREATE TABLE game1 (
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);