drop table candidates;
drop table users;

create table users
(
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500)
);

create table candidates
(
    id serial primary key,
    username varchar(100),
    candidate_id integer references users(id)
);