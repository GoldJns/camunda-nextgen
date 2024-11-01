

CREATE TABLE health_records (
                                id SERIAL PRIMARY KEY,
                                username VARCHAR(10) NOT NULL UNIQUE,
                                allergies VARCHAR(255),
                                chronic_conditions VARCHAR(255),
                                surgeries VARCHAR(255),
                                health_insurance VARCHAR(255),
                                FOREIGN KEY (username) REFERENCES public.user_entity(username) ON DELETE CASCADE
);

CREATE TABLE visits (
                        id SERIAL PRIMARY KEY,
                        health_record_id BIGINT,
                        date_of_visit DATE NOT NULL,
                        diagnosis VARCHAR(255),
                        treatment VARCHAR(255),
                        FOREIGN KEY (health_record_id) REFERENCES health_records(id) ON DELETE CASCADE
);