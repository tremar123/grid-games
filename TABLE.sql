--users table
CREATE TABLE users (
    id INTEGER,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY(id)
    );
CREATE UNIQUE INDEX username ON users (username);

CREATE TABLE bugs (
    id INTEGER,
    user_id INTEGER,
    email TEXT,
    text TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES (users.id)
);

CREATE TABLE leaderboard (
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES (users.id)
);