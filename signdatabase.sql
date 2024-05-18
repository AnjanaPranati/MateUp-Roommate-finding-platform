create database signin;
use signin;

create table if not exists usersign
(
 user_name varchar(100),
 user_mail varchar(200),
 user_mon int not null primary key
 );
use signin;
alter TABLE usersign
ADD user_gender varchar(255);
ALTER TABLE usersign
ADD user_sem varchar(255);
select * from usersign;
alter table usersign
modify user_mon bigint;
