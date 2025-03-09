CREATE TABLE IF NOT EXISTS job_applicants (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   education_level VARCHAR(100),
   email VARCHAR(100) UNIQUE NOT NULL,
   phone VARCHAR(15),
   field VARCHAR(100),
   level VARCHAR(50)  
);

INSERT INTO job_applicants (name, education_level, email, phone, field, level) 
VALUES 
('Alice Johnson', 'Bachelor\'s Degree', 'alice@example.com', '123-456-7890', 'Software Engineering', 'Entry-Level'),
('Bob Smith', 'Master\'s Degree', 'bob@example.com', '987-654-3210', 'Data Science', 'Mid-Level'),
('Charlie Brown', 'PhD', 'charlie@example.com', '555-666-7777', 'Artificial Intelligence', 'Senior-Level');
 SELECT * FROM job_applicants ;

 CREATE TABLE IF NOT EXISTS adminlogin (
    username VARCHAR(50)  NOT NULL,
    password VARCHAR (50)

 );
  CREATE TABLE IF NOT EXISTS recruiterlogin (
    username VARCHAR(50)  NOT NULL,
    password VARCHAR (50)

 );
  CREATE TABLE IF NOT EXISTS userlogin (
    username VARCHAR(50)  NOT NULL,
    password VARCHAR (50)

 );
 CREATE TABLE jobposting (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    r_title VARCHAR(100) NOT NULL,
    recruiter VARCHAR(100),
    category VARCHAR(100),
    post_date DATE NOT NULL,
    emp_role VARCHAR (100),
    location  VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    contactnum VARCHAR(15)

) AUTO_INCREMENT = 100;

 CREATE TABLE jobs_applied (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100),
    app_name VARCHAR(100) NOT NULL,
    position VARCHAR (100),
    location  VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    contactnum VARCHAR(15),
    status VARCHAR(100)

) AUTO_INCREMENT = 500;