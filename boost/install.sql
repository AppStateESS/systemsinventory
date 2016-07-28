BEGIN;

CREATE TABLE systems_location (
       id serial,
       description character varying,
       PRIMARY KEY (id)
);

CREATE TABLE systems_department (
       id serial,
       description character varying,
       display_name character varying,
       parent_department integer default NULL,
       active smallint default 1,
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
       room_number character varying default NULL,
       department_id integer REFERENCES systems_department(id),
       device_type_id integer REFERENCES systems_device_type(id),
       model character varying default NULL,
       hd_size character varying default NULL,
       processor character varying default NULL,
       ram character varying default NULL,
       mac character(20) default NULL,
       mac2 character(20) default NULL,
       primary_ip character varying default NULL,
       secondary_ip character varying default NULL,
       manufacturer character varying default NULL,
       vlan integer default 0,
       first_name character varying default NULL,
       last_name character varying default NULL,
       username character varying default NULL,
       phone character varying default NULL,
       purchase_date integer,
       profile smallint default 0,
       profile_name character varying default NULL,
       notes character varying default NULL,
       sys_period tstzrange not null,
       PRIMARY KEY (id)
);

CREATE TABLE systems_device_history (LIKE systems_device);

CREATE TABLE systems_pc (
       id    serial,
       device_id integer REFERENCES systems_device(id),
       primary_monitor character varying,
       secondary_monitor character varying,
       video_card character varying,
       server_type character varying,
       os character varying,
       battery_backup smallint default 0,
       redundant_backup smallint default 0,       
       touch_screen smallint default 0,       
       dual_monitor smallint default 0,       
       system_usage character varying,
       rotation smallint default 0,
       stand smallint default 0,
       smart_room smallint default 0,
       check_in smallint default 0,
       PRIMARY KEY (id)
);

CREATE TABLE systems_camera (
       id    serial,
       device_id integer REFERENCES systems_device(id),
       sd_support smallint default 0,
       megapixels character varying,
       hi_def smallint,
       exterior smallint default 0,
       covert smallint default 0,
       is_on smallint default 0,
       PRIMARY KEY (id)
);

CREATE TABLE systems_ipad (
       id    serial,
       device_id integer REFERENCES systems_device(id),
       generation character varying,
       apple_id character varying,
       PRIMARY KEY (id)
);

CREATE TABLE systems_digital_sign (
       id    serial,
       device_id integer REFERENCES systems_device(id),
       screen_size character varying,
       hi_def smallint,
       screen_manufacturer character varying,
       PRIMARY KEY (id)
);

CREATE TABLE systems_printer (
       id    serial,
       device_id integer REFERENCES systems_device(id),
       color smallint default 0,
       toner_cartridge character varying,
       duplex smallint default 0,
       network smallint default 0,
       PRIMARY KEY (id)
);

CREATE TABLE systems_permission (
       id serial,
       user_id integer,
       departments text,
       PRIMARY KEY (id)
);

CREATE TRIGGER versioning_trigger BEFORE INSERT OR UPDATE OR DELETE ON systems_device FOR EACH ROW EXECUTE PROCEDURE versioning('sys_period', 'systems_device_history', true);

insert into systems_location ("display_name") values ('NONE');
insert into systems_location ("display_name") values ('App Heights');
insert into systems_location ("display_name") values ('Appalachian Hall');
insert into systems_location ("display_name") values ('Appalachian Panhellenic Hall');
insert into systems_location ("display_name") values ('B.B. Dougherty');
insert into systems_location ("display_name") values ('Belk Hall');
insert into systems_location ("display_name") values ('Bowie Hall');
insert into systems_location ("display_name") values ('Camp Broadstone');
insert into systems_location ("display_name") values ('Cannon Hall');
insert into systems_location ("display_name") values ('Coltrane Hall');
insert into systems_location ("display_name") values ('Cone Hall');
insert into systems_location ("display_name") values ('Doughton Hall');
insert into systems_location ("display_name") values ('East Hall');
insert into systems_location ("display_name") values ('Eggers Hall');
insert into systems_location ("display_name") values ('Frank Hall');
insert into systems_location ("display_name") values ('Gardner Hall');
insert into systems_location ("display_name") values ('Housing Warehouse');
insert into systems_location ("display_name") values ('Hoey Hall');
insert into systems_location ("display_name") values ('JET');
insert into systems_location ("display_name") values ('Justice Hall');
insert into systems_location ("display_name") values ('Legends');
insert into systems_location ("display_name") values ('Living Learning Center');
insert into systems_location ("display_name") values ('Lovell Hall');
insert into systems_location ("display_name") values ('Mountaineer Hall');
insert into systems_location ("display_name") values ('Newland Hall');
insert into systems_location ("display_name") values ('State Farm');
insert into systems_location ("display_name") values ('SRC');
insert into systems_location ("display_name") values ('Student Support');
insert into systems_location ("display_name") values ('Student Union');
insert into systems_location ("display_name") values ('Summit Hall');
insert into systems_location ("display_name") values ('Quin');
insert into systems_location ("display_name") values ('White Hall');
insert into systems_location ("display_name") values ('Winkler Hall');

insert into systems_department ("display_name") values ('NONE');
insert into systems_department ("display_name","parent_department") values ('Career Development',1;
insert into systems_department ("display_name","parent_department") values ('Peer Career',lastval()-1);
insert into systems_department ("display_name","parent_department") values ('CSIL',1);
insert into systems_department ("display_name","parent_department") values ('BSA',lastval()-1);
insert into systems_department ("display_name","parent_department") values ('Club Hub',lastval()-2);
insert into systems_department ("display_name","parent_department") values ('Greek Office',lastval()-3);
insert into systems_department ("display_name","parent_department") values ('Student Government',lastval()-4);
insert into systems_department ("display_name","parent_department") values ('Student Publication',lastval()-5);
insert into systems_department ("display_name","parent_department") values ('Counseling Services',1);
insert into systems_department ("display_name","parent_department") values ('Child Development',1);
insert into systems_department ("display_name","parent_department") values ('Dean of Students',1);
insert into systems_department ("display_name","parent_department") values ('Parent and Family Services',lastval()-1);
insert into systems_department ("display_name","parent_department") values ('ESS',1);
insert into systems_department ("display_name","parent_department") values ('Health Services',1);
insert into systems_department ("display_name","parent_department") values ('Multicultural Student Development',1);
insert into systems_department ("display_name","parent_department") values ('LGBT',lastval()-1);
insert into systems_department ("display_name","parent_department") values ('Multicultural Center',lastval()-2);
insert into systems_department ("display_name","parent_department") values ('Womans Center',lastval()-3);
insert into systems_department ("display_name","parent_department") values ('Student Conduct',1);
insert into systems_department ("display_name","parent_department") values ('Student Development Admin',1);
insert into systems_department ("display_name","parent_department") values ('Student Programs',1);
insert into systems_department ("display_name","parent_department") values ('ACT',lastval()-1);
insert into systems_department ("display_name","parent_department") values ('APPS',lastval()-2);
insert into systems_department ("display_name","parent_department") values ('Legends',lastval()-3);
insert into systems_department ("display_name","parent_department") values ('White Water',lastval()-4);
insert into systems_department ("display_name","parent_department") values ('University Housing',1);
insert into systems_department ("display_name","parent_department") values ('University Recreation',1);
insert into systems_department ("display_name","parent_department") values ('Outdoor Programs',lastval()-1);
insert into systems_department ("display_name","parent_department") values ('Wellness Center',1);

Insert into systems_device_type ("id","description") values (1,'pc');
insert into systems_device_type ("id","description") values (2,'server');
insert into systems_device_type ("id","description") values (3,'ipad');
insert into systems_device_type ("id","description") values (4,'printer');
insert into systems_device_type ("id","description") values (5,'camera');
insert into systems_device_type ("id","description") values (6,'digital sign');
insert into systems_device_type ("id","description") values (7,'time clock');

COMMIT;
       
