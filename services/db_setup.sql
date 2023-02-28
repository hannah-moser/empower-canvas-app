-- SQL to set up the database structure for storing canvas notes
-- This will need to be run before starting up the applicaiton
-- See readme for more details

USE empower;

CREATE TABLE canvas(id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL, 
notes text, 
date_created DATETIME DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY (id));