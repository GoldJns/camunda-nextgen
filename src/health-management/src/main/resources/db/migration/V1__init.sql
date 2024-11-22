CREATE TABLE health_insurances
(
    name VARCHAR(255) PRIMARY KEY
);

INSERT INTO health_insurances (name)
VALUES ('Health Insurance A'),
       ('Health Insurance B'),
       ('Health Insurance C'),
       ('Health Insurance D');


CREATE TABLE health_records
(
    id                     SERIAL PRIMARY KEY,
    user_id                VARCHAR(36)           NOT NULL,
    username               VARCHAR(10)           NOT NULL,
    allergies              VARCHAR(255),
    medical_health_history VARCHAR(255),
    diagnoses              VARCHAR(255),
    medicines              VARCHAR(255),
    health_insurance       VARCHAR(255),
    has_left               BOOLEAN DEFAULT FALSE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user_entity (id) ON DELETE CASCADE,
    FOREIGN KEY (health_insurance) REFERENCES health_insurances (name)
);

