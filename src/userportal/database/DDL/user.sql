drop TABLE appuser; 

CREATE TABLE appuser (
    user_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(15) CHECK (role IN ('doctor', 'patient')),
    firstname VARCHAR(255), 
    lastname VARCHAR(255),
    age INT
);

INSERT INTO appuser (user_id, email, password, role, firstname, lastname, age)
VALUES 
(1, 'doctor@example.com', 'password123', 'doctor', 'John', 'Doe', 45),
(2, 'patient1@example.com', 'password456', 'patient', 'Jane', 'Smith', 30),
(3, 'patient2@example.com', 'password789', 'patient', 'Emily', 'Johnson', 25);