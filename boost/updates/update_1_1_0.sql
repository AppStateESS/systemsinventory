ALTER TABLE systems_ipad ADD COLUMN system_usage character varying;
ALTER TABLE systems_pc ADD COLUMN is_server smallint;
ALTER TABLE systems_device ADD COLUMN status smallint default 0;
UPDATE systems_device SET status=2;