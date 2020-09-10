Tutorial: https://dzone.com/articles/tutorial-connect-your-angular-app-to-mysql

## Prerequisition

- A already installed MySQL or MariaDB database server.
- nodejs and npm.

## Create database

Login into database:
`$ mysql -u root`

~~~
create database hscheel_timeline;
use hscheel_timeline;

// create a user and grant all rights to the currently created database
create user 'hscheel_timeline_user'@'localhost' identified by 'hscheel_timeline_user_password';
grant all on hscheel_timeline.* to 'hscheel_timeline_user'@'localhost';

// create the table
create table events (
  id INT AUTO_INCREMENT,
  owner VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  PRIMARY KEY (id),
  INDEX (owner, date)
);

quit
~~~

## Set up a Simple CRUD Node Express Server

`npm init`

`npm install --save-exact express cors mysql`