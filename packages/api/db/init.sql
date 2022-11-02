CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS app_user (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS server (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE,
  description VARCHAR,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS channel (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  description VARCHAR,
  server_id UUID NOT NULL,
  FOREIGN KEY (server_id) REFERENCES server(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP,
  UNIQUE (name, server_id)
);

CREATE TABLE IF NOT EXISTS post (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  text VARCHAR NOT NULL,
  channel_id UUID NOT NULL,
  FOREIGN KEY (channel_id) REFERENCES channel(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS serveruser (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE,
  server_id UUID NOT NULL,
  FOREIGN KEY (server_id) REFERENCES server(id) ON DELETE CASCADE,
  role VARCHAR(60) NOT NULL CHECK (role = 'admin' OR role = 'member'),
  UNIQUE (user_id, server_id)
);

CREATE sOR REPLACE FUNCTION addusertoserver(text, UUID, UUID) RETURNS void
AS $$
  INSERT INTO serveruser (role, server_id, user_id)
  VALUES ($1, $2, $3)
$$
LANGUAGE SQL;