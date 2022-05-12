CREATE TABLE food(
	food_id SERIAL NOT NULL PRIMARY KEY,
	CO2e_per_kg DECIMAL NOT NULL,
	name text UNIQUE NOT NULL,
	category_id INT NOT NULL,
		CONSTRAINT category_id_FK FOREIGN KEY (category_id) REFERENCES food_category(category_id),	
	energy DECIMAL NOT NULL,
	agriculture DECIMAL NOT NULL,
	ILUC DECIMAL NOT NULL,
	processing DECIMAL NOT NULL,
	PACKAGING DECIMAL NOT NULL,
	transport DECIMAL NOT NULL,
	retail DECIMAL NOT NULL
)
	
CREATE TABLE question(
	question_id SERIAL NOT NULL PRIMARY KEY,
	option_0 INT NOT NULL,
		CONSTRAINT option_0_FK FOREIGN KEY (option_0) REFERENCES food(food_id)
	option_1 INT NOT NULL,
		CONSTRAINT option_1_FK FOREIGN KEY (option_1) REFERENCES food(food_id)
)

CREATE TABLE answer(
	answer_id SERIAL NOT NULL PRIMARY KEY,
	question_id INT NOT NULL,
		CONSTRAINT question_id_FK FOREIGN KEY (question_id) REFERENCES question(question_id)
	option_chosen BOOL NOT NULL
	user_id INT NOT NULL
	datetime timestamp
)

CREATE TABLE food_category(
	category_id SERIAL NOT NULL PRIMARY KEY,
	category TEXT NOT NULL UNIQUE
)

CREATE TABLE emmision_category(
	category_id SERIAL NOT NULL PRIMARY KEY,
	category TEXT NOT NULL UNIQUE,
	description TEXT NOT NULL
)
