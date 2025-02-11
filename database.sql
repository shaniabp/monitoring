CREATE DATABASE IF NOT EXISTS monitoring_kolam;
USE monitoring_kolam;

CREATE TABLE sensor_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    suhu FLOAT,
    ph FLOAT,
    tds FLOAT
);
