<?php

use phpws2\Database;

function runDbMigration($fileName)
{
    $db = new PHPWS_DB();
    $result = $db->importFile(PHPWS_SOURCE_DIR . 'mod/systemsinventory/boost/updates/' . $fileName);
    if (PEAR::isError($result)) {
        throw new \Exception($result->toString());
    }
}

function v1_3_4Update(){
    $results = $pcResults = $laptopResults = array();
    
    $db = \phpws2\Database::getDB();
    $query = 'ALTER TABLE systems_device ADD COLUMN rotation smallint default 0';
    $result = $db->exec($query);
    $query = "select device_id from systems_pc where rotation = 1";
    $db->loadStatement($query);
    $pcResults = $db->fetchAll();
    $query = "select device_id from systems_laptop where rotation = 1";
    $db->loadStatement($query);
    $laptopResults = $db->fetchAll();
    $results = array_merge($pcResults, $laptopResults);
    
    foreach($results as $device){
        $id = $device['device_id'];
        $update_query = "update systems_device set rotation = 1 where id = $id";
        $db->exec($update_query);
    }
    
    $query = 'ALTER TABLE systems_device_history ADD COLUMN rotation smallint default 0';
    $db->exec($query);
}

function systemsinventory_update(&$content, $currentVersion)
{
    switch ($currentVersion) {
        case version_compare($currentVersion, '1.0.0', '<'):
            PHPWS_Core::initModClass('users', 'permission.php');
            User_Permission::registerPermissions('systemsinventory', $content);

        case version_compare($currentVersion, '1.0.2', '<'):
            runDbMigration('update_1_0_2.sql');

        case version_compare($currentVersion, '1.0.3', '<'):
            runDbMigration('update_1_0_3.sql');

        case version_compare($currentVersion, '1.0.4', '<'):
            runDbMigration('update_1_0_4.sql');

        case version_compare($currentVersion, '1.0.5', '<'):
            runDbMigration('update_1_0_5.sql');

        case version_compare($currentVersion, '1.1.0', '<'):
            runDbMigration('update_1_1_0.sql');

        case version_compare($currentVersion, '1.2.0', '<'):
            $content[] = <<<EOF
<pre>
1.2.0
-----
Overhaul of interfact and functionality.
</pre>
EOF;
        case version_compare($currentVersion, '1.2.5', '<'):
            $content[] = <<<EOF
<pre>
1.2.5
-----
+ Fixed permission issues with restricted users
+ Removed delete permission from normal users. Deity only.
+ Fixed error messages and checks in unassigned and assign forms.
+ Fixed null search locking out ui.
</pre>
EOF;
        case version_compare($currentVersion, '1.2.6', '<'):
            $content[] = <<<EOF
<pre>
1.2.6
-----
+ Fixed delete
</pre>
EOF;
        case version_compare($currentVersion, '1.3.0', '<'):
            runDbMigration('update_1_3_0.sql');
        case version_compare($currentVersion, '1.3.2', '<'):
            runDbMigration('update_1_3_2.sql', '1.3.2', '<');
            $content[] = <<<EOF
<pre>
1.3.2
-----
+ Added parent location
</pre>
EOF;
            case version_compare($currentVersion, '1.3.3', '<'):
            runDbMigration('update_1_3_3.sql', '1.3.3', '<');
            $content[] = <<<EOF
<pre>
1.3.3
-----
+ Mac data type changed
</pre>
EOF;
            case version_compare($currentVersion, '1.3.4', '<'):
            v1_3_4Update();
            runDbMigration('update_1_3_4.sql', '1.3.4', '<');
            $content[] = <<<EOF
<pre>
1.3.4
-----
+ Moved rotation to device table
</pre>
EOF;
            case version_compare($currentVersion, '1.4', '<'):
            runDbMigration('update_1_4.sql', '1.4', '<');
            $content[] = <<<EOF
<pre>
1.3.4
-----
+ Add content creator to digital sign
</pre>
EOF;

            }
    return TRUE;
}
