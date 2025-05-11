DROP TABLE cities;

CREATE TABLE cities (
    city_id INT PRIMARY KEY,
    city VARCHAR(30) NOT NULL,
    center VARCHAR(30) NOT NULL
);

DROP TABLE flats;

CREATE TABLE flats (
    flat_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    city_id INT,
    position VARCHAR(30) NOT NULL,
    price BIGINT,
    head TEXT,
    info TEXT
);

CREATE INDEX city_index ON flats(city_id); 