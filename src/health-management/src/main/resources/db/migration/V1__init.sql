ALTER TABLE public.user_entity
    ADD CONSTRAINT user_entity_username_unique UNIQUE (username);


CREATE TABLE health_records (
                                id SERIAL PRIMARY KEY,
                                username VARCHAR(10) NOT NULL UNIQUE,
                                allergies VARCHAR(255),
                                chronic_conditions VARCHAR(255),
                                surgeries VARCHAR(255),
                                health_insurance VARCHAR(255),
                                hasLeft BOOLEAN DEFAULT FALSE NOT NULL,
                                FOREIGN KEY (username) REFERENCES public.user_entity(username) ON DELETE CASCADE
);