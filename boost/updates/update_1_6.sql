CREATE TABLE systems_checkout (
       id serial,
       device_id integer REFERENCES systems_device(id),
       first_name character varying default NULL,
       last_name character varying default NULL,
       username character varying default NULL,
       checkout_time integer default NULL,
       checkin_time integer default NULL,
       notes character varying default NULL,
       PRIMARY KEY (id)
);