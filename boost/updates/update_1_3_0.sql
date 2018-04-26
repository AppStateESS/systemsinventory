ALTER TABLE systems_pc ADD COLUMN is_laptop smallint default 1;
INSERT INTO systems_device_type VALUES (8, 'laptop');
ALTER TABLE systems_pc DROP COLUMN docking_stand; 