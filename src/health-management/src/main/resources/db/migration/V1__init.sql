CREATE TABLE appuser (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    age INT
);

CREATE TABLE health_records (
    id SERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    insurance_details VARCHAR(255),
    FOREIGN KEY (patient_id) REFERENCES appuser(user_id) ON DELETE CASCADE
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    health_record_id BIGINT,
    date_of_visit DATE NOT NULL,
    diagnosis VARCHAR(255),
    treatment VARCHAR(255),
    doctor_notes TEXT,
    is_approved BOOLEAN NOT NULL,
    FOREIGN KEY (health_record_id) REFERENCES health_records(id) ON DELETE CASCADE
);