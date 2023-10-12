-- Active: 1697110420012@@110.239.65.76@3306@db_exam20
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users(username,password,role,email,phone_number) VALUES('admin','admin123','admin','admin@gmail.com','+628123456789');

SELECT * FROM users;

CREATE TABLE incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    users_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incident_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    users_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tickets
ADD CONSTRAINT fk_tickets_incidents
FOREIGN KEY (incident_id)
REFERENCES incidents(id);

ALTER TABLE tickets
ADD CONSTRAINT fk_tickets_users
FOREIGN KEY (users_id)
REFERENCES users(id);

CREATE TABLE cwo (
    id SERIAL PRIMARY KEY,
    incident_id INT NOT NULL,
    status_ticket VARCHAR(255) NOT NULL,
    status_wo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
);

SELECT
    cwo.status_wo AS status,
    incidents.*,
    tickets.*
FROM cwo
INNER JOIN tickets ON cwo.incident_id = tickets.incident_id
INNER JOIN incidents ON cwo.incident_id = incidents.id;
