CREATE TABLE systems_log (
       id serial,
       username character varying,
       device_id integer REFERENCES systems_device(id),
       log_type integer,
       timestamp integer,
       PRIMARY KEY (id)
);