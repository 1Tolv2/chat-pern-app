CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE,
  description VARCHAR,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  description VARCHAR,
  server_id SERIAL NOT NULL,
  FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP,
  UNIQUE (name, server_id)
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  text VARCHAR NOT NULL,
  channel_id INTEGER NOT NULL,
  FOREIGN KEY (channel_id) REFERENCES channels (id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS serverusers (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  server_id INT NOT NULL,
  FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE,
  role VARCHAR(60) NOT NULL CHECK (role = 'admin' OR role = 'member'),
  UNIQUE (user_id, server_id)
);

CREATE OR REPLACE FUNCTION addusertoserver(text, numeric, numeric) RETURNS void
AS $$
  INSERT INTO serverusers (role, server_id, user_id)
  VALUES ($1, $2, $3)
$$
LANGUAGE SQL;

