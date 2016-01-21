BEGIN;

CREATE TABLE systems_location (
       id serial,
       description character varying,
       PRIMARY KEY (id)
);

CREATE TABLE systems_department (
       id serial,
       description character varying,
       PRIMARY KEY (id)
);

CREATE TABLE systems_device_type (
       id integer,
       description character varying,
       PRIMARY KEY (id)
);

CREATE TABLE systems_device (
       id    serial,
       location_id integer REFERENCES systems_location(id),
       physical_id character varying,
       room_number character varying,
       department_id integer REFERENCES systems_department(id),
       device_type_id integer REFERENCES systems_device_type(id),
       model character varying,
       hd_size integer,
       processor character varying,
       ram character varying,
       mac character(20),
       mac2 character(20),
       primary_ip character varying,
       secondary_ip character varying,
       manufacturer character varying,
       first_name character varying,
       last_name character varying,
       username character varying,
       phone character varying,
       purchase_date integer,
       profile smallint default 0,
       profile_name character varying,
       notes character varying,
       sys_period tstzrange not null,
       PRIMARY KEY (id)
);

CREATE TABLE systems_device_history (LIKE systems_device);

CREATE TABLE systems_pc (
       device_id integer REFERENCES systems_device(id),
       peripheral_id integer,
       primary_monitor character varying,
       secondary_monitor character varying,
       video_card character varying,
       server_type character varying,
       os character varying,
       battery_backup smallint default 0,
       redundant_backup smallint default 0,       
       hold_system smallint default 0,       
       dual_monitor smallint default 0,       
       system_usage integer,
       rotation smallint default 0,
       stand smallint default 0,
       smart_room smallint default 0,
       check_in smallint default 0
);

CREATE TABLE systems_camera (
       device_id integer REFERENCES systems_device(id),
       sd_support smallint default 0,
       megapixels character varying,
       hd smallint,
       outdoor smallint default 0,
       covert smallint default 0,
       is_on smallint default 0
);

CREATE TABLE systems_ipad (
       device_id integer REFERENCES systems_device(id),
       generation integer,
       special_apps character(255),
       apple_id character varying
);

CREATE TABLE systems_digital_sign (
       device_id integer REFERENCES systems_device(id),
       screen_size integer,
       hd smallint,
       player_id integer REFERENCES systems_device(id),
       designer character varying
);

CREATE TABLE systems_printer (
       device_id integer REFERENCES systems_device(id),
       color smallint default 0,
       toner_cartridge character varying,
       duplex smallint default 0,
       network smallint
);

CREATE TABLE systems_permission (
       id serial,
       name varchar(32) not null,
       full_name text,
       PRIMARY KEY (id)
);

CREATE TRIGGER versioning_trigger BEFORE INSERT OR UPDATE OR DELETE ON systems_device FOR EACH ROW EXECUTE PROCEDURE versioning('sys_period', 'systems_device_history', true);

insert into systems_location ("description") values ('NONE');
insert into systems_location ("description") values ('JET');
insert into systems_department ("description") values ('NONE');
insert into systems_department ("description") values ('ESS');
insert into systems_device_type ("id","description") values (1,'pc');
insert into systems_device_type ("id","description") values (2,'server');
insert into systems_device_type ("id","description") values (3,'ipad');
insert into systems_device_type ("id","description") values (4,'printer');
insert into systems_device_type ("id","description") values (5,'camera');
insert into systems_device_type ("id","description") values (6,'digital sign');
insert into systems_device_type ("id","description") values (7,'time clock');

COMMIT;
       