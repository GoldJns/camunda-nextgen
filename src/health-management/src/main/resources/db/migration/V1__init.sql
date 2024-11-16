CREATE TABLE health_insurances
(
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE health_records
(
    id                 SERIAL PRIMARY KEY,
    user_id            VARCHAR(36)           NOT NULL,
    username           VARCHAR(10)           NOT NULL,
    allergies          VARCHAR(255),
    chronic_conditions VARCHAR(255),
    surgeries          VARCHAR(255),
    health_insurance   VARCHAR(255),
    has_left           BOOLEAN DEFAULT FALSE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user_entity (id) ON DELETE CASCADE,
    FOREIGN KEY (health_insurance) REFERENCES health_insurances (name)
);

INSERT INTO health_insurances (name)
VALUES ('Health Insurance A'),
       ('Health Insurance B'),
       ('Health Insurance C'),
       ('Health Insurance D');

CREATE TABLE appointment (
                            id SERIAL PRIMARY KEY,
                            user_id varchar(36),
                            doc_name varchar(100),
                            month varchar(255),
                            day varchar(255),
                            date DATE,
                            time TIME,
                            FOREIGN KEY (userID) REFERENCES public.user_entity(id) ON DELETE CASCADE
);

-- fuer Wiwa
INSERT INTO appointment (id, userID, month, day, date, time) VALUES
(1, '50d46380-82d1-450e-87bf-456ef040dbd4', 'January', 'Monday', '2024-01-01', '09:00'),
(2, '50d46380-82d1-450e-87bf-456ef040dbd4', 'February', 'Tuesday', '2024-02-13', '10:30'),
(3, '50d46380-82d1-450e-87bf-456ef040dbd4', 'March', 'Wednesday', '2024-03-20', '14:00'),
(4, '50d46380-82d1-450e-87bf-456ef040dbd4', 'April', 'Thursday', '2024-04-25', '15:15'),
(5, '50d46380-82d1-450e-87bf-456ef040dbd4', 'May', 'Friday', '2024-05-10', '11:45'),
(6, '50d46380-82d1-450e-87bf-456ef040dbd4', 'June', 'Saturday', '2024-06-15', '08:30'),
(7, '50d46380-82d1-450e-87bf-456ef040dbd4', 'July', 'Sunday', '2024-07-07', '13:00'),
(8, '50d46380-82d1-450e-87bf-456ef040dbd4', 'August', 'Monday', '2024-08-12', '16:45'),
(9, '50d46380-82d1-450e-87bf-456ef040dbd4', 'September', 'Tuesday', '2024-09-19', '10:00'),
(10, '50d46380-82d1-450e-87bf-456ef040dbd4', 'October', 'Wednesday', '2024-10-23', '09:30'),
(11, '50d46380-82d1-450e-87bf-456ef040dbd4', 'November', 'Thursday', '2024-11-28', '15:00'),
(12, '50d46380-82d1-450e-87bf-456ef040dbd4', 'December', 'Friday', '2024-12-22', '19:15');

