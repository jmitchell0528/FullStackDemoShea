delete from emails where id = $1;
select * from emails where email_id = $2;
