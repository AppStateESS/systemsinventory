/* TODO: Don't forget to remve is_pc from device_laptop */
INSERT INTO systems_device_type VALUES (8, 'laptop');
ALTER TABLE systems_pc DROP COLUMN docking_stand;
CREATE TABLE systems_laptop (
       id    serial,
       device_id integer REFERENCES systems_device(id),
       primary_monitor character varying,
       video_card character varying,
       os character varying,
       battery_backup smallint default 0,
       redundant_backup smallint default 0,
       touch_screen smallint default 0,
       system_usage character varying,
       rotation smallint default 0,
       docking_station smallint default 0,
       smart_room smallint default 0,
       check_in smallint default 0,
       PRIMARY KEY (id)
);
/* This will pull laptops from PC table and put them in systems_laptop
INSERT INTO systems_laptop (corresponding columns)
SELECT columns FROM systems_pc
WHERE *They are alike*
*/
