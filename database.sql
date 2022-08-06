--DB NAME todo

create table "todo"(
"id" SERIAL PRIMARY KEY,
"task" VARCHAR (150) NOT NULL,
"is_done" BOOLEAN NOT NULL DEFAULT FALSE
);
--CREATE TABLE

insert into "todo"("task", "is_done")
values('take out trash',false),
('baptize cat', false),
('clean bedroom', false),
('weed gardens', false),
('water houseplants', false)
--INSERT 0 5

select * from todo
--Success!