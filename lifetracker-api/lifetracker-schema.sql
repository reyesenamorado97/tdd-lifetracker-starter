CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    location TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT NOW()
    updated_at DATE NOT NULL DEFAULT NOW()

);