ALTER TABLE systems_location RENAME COLUMN description TO display_name;
ALTER TABLE systems_location ADD COLUMN description character varying;
ALTER TABLE systems_location ADD COLUMN active SMALLINT default 1;