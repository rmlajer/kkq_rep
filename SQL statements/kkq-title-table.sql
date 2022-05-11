CREATE TABLE result_title(
	result_title_id SERIAL PRIMARY KEY,
	title text UNIQUE NOT NULL,
	description text NOT NULL);