CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(64) NOT NULL,
	email VARCHAR(255) NOT NULL,
	passhash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);