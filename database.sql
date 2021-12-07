CREATE DATABASE sri_shakti_database;

--\c into users_database

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  age REAL,
  email VARCHAR(255),
  password VARCHAR(255)
);
