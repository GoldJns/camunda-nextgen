CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE appuser (
                         user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         username VARCHAR(10) NOT NULL UNIQUE,
                         email VARCHAR(50) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL,
                         role VARCHAR(20) NOT NULL,
                         firstname VARCHAR(50),
                         lastname VARCHAR(50),
                         age INT
);

CREATE TABLE health_records (
                                id SERIAL PRIMARY KEY,
                                username VARCHAR(10) NOT NULL UNIQUE,
                                allergies VARCHAR(255),
                                chronic_conditions VARCHAR(255),
                                surgeries VARCHAR(255),
                                health_insurance VARCHAR(255),
                                FOREIGN KEY (username) REFERENCES appuser(username) ON DELETE CASCADE
);

CREATE TABLE visits (
                        id SERIAL PRIMARY KEY,
                        health_record_id BIGINT,
                        date_of_visit DATE NOT NULL,
                        diagnosis VARCHAR(255),
                        treatment VARCHAR(255),
                        FOREIGN KEY (health_record_id) REFERENCES health_records(id) ON DELETE CASCADE
);