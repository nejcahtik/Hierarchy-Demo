DROP SCHEMA IF EXISTS myapp;
CREATE DATABASE myapp;

USE myapp;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE products (
	product_id int NOT NULL AUTO_INCREMENT,
    product_name varchar(50),
    product_partner varchar(50),
	constant DECIMAL(20,5),
	plan_value varchar(50),
    basic_name varchar(50),
    plan_type varchar(20),
    product_type varchar (50),
    plan_name varchar (50),
    bcv DECIMAL(20,5),
    points_earned DECIMAL(20,5),
    points_to_be_paid varchar(10),
    points_for_career varchar(10),
    satbppr varchar(10),
    PRIMARY KEY (product_id)
    ) ENGINE =InnoDB DEFAULT CHARSET=utf8mb4;
    
CREATE TABLE clients (
	client_id int NOT NULL AUTO_INCREMENT,
    client_name varchar(20),
    client_surname varchar(20),
	address varchar(80),
    city varchar(50),
    email varchar(50),
    EMSO bigint,
    PRIMARY KEY (client_id)
    ) ENGINE =InnoDB DEFAULT CHARSET=utf8mb4;
    
CREATE TABLE hierarchy (
	level_id int NOT NULL AUTO_INCREMENT,
	hierarchy_level int NOT NULL,
    hierarchy_level_name varchar(50),
    points_from DECIMAL(20,5),
    points_to DECIMAL(20,5),
    in_eur DECIMAL(20,5),
    PRIMARY KEY (level_id)
    ) ENGINE =InnoDB DEFAULT CHARSET=utf8mb4;  

CREATE TABLE users (
	user_id int NOT NULL AUTO_INCREMENT,
    name_of_user varchar(50),
    surname_of_user varchar(50),
    mentor_id int,
    date_of_mentorship DATE,
    personal_points DECIMAL(20,5),
    networking_points DECIMAL (20,5),
    paid_points DECIMAL (20,5),    
    cash DECIMAL(20,5),
    paid_cash DECIMAL(20,5),
	level_id int,
    EMSO bigint,
    municipality varchar(50),
    geolocation varchar(50),
    TRR varchar(50),
    bank varchar(50),
    employment_contract_date DATE,
    PRIMARY KEY (user_id),
	FOREIGN KEY (level_id) REFERENCES hierarchy(level_id),
    FOREIGN KEY (mentor_id) REFERENCES users(user_id)
    ) ENGINE =InnoDB DEFAULT CHARSET=utf8mb4;
    
CREATE TABLE contracts (
	contract_id int NOT NULL AUTO_INCREMENT,
	product_id int,
	user_id int,
	client_id int,
    date_of_payment DATE,
    base_value DECIMAL(20,5),
    number_of_points DECIMAL(20,5),
    in_eur DECIMAL(20,5),
    paid_out VARCHAR(10),
    PRIMARY KEY (contract_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
    ) ENGINE =InnoDB DEFAULT CHARSET=utf8mb4;
    
CREATE TABLE executed_contracts (
	contract_id int NOT NULL AUTO_INCREMENT,
	user_id int,
    subordinate_id int,
    agent_id int,
	client_id int,
	product_id int,
    date_of_payment DATE,
    base_value DECIMAL(20,5),
    number_of_points DECIMAL(20,5),
    in_eur DECIMAL(20,5),
    paid_out varchar(10),
	PRIMARY KEY (contract_id, user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (subordinate_id) REFERENCES users(user_id),
    FOREIGN KEY (agent_id) REFERENCES users(user_id),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
    ) ENGINE =InnoDB DEFAULT CHARSET=utf8mb4;    
    
