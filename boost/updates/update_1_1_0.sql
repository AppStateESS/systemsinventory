ALTER TABLE systems_ipad ADD COLUMN phone character varying;
ALTER TABLE systems_ipad ADD COLUMN system_usage character varying;
ALTER TABLE systems_pc ADD COLUMN is_server smallint;
ALTER TABLE systems_pc ADD COLUMN docking_stand smallint;
ALTER TABLE systems_printer ADD COLUMN phone character varying;
ALTER TABLE systems_device ADD COLUMN status smallint;