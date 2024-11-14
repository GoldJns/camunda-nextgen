CREATE TABLE health_records (
                                id SERIAL PRIMARY KEY,
                                user_id VARCHAR(36) NOT NULL,
                                username VARCHAR(10) NOT NULL,
                                allergies VARCHAR(255),
                                chronic_conditions VARCHAR(255),
                                surgeries VARCHAR(255),
                                health_insurance VARCHAR(255),
                                has_left BOOLEAN DEFAULT FALSE NOT NULL,
                                FOREIGN KEY (user_id) REFERENCES public.user_entity(id) ON DELETE CASCADE
);