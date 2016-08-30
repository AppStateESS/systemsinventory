ALTER TABLE systems_department RENAME COLUMN description TO display_name;
ALTER TABLE systems_department RENAME COLUMN parent TO parent_department;
ALTER TABLE systems_department ADD COLUMN description character varying;
ALTER TABLE systems_department ADD COLUMN active SMALLINT default 1;
