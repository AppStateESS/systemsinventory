<?php

function runDbMigration($fileName)
{
    $db = new PHPWS_DB();
    $result = $db->importFile(PHPWS_SOURCE_DIR . 'mod/systemsinventory/boost/updates/' . $fileName);
    if (PEAR::isError($result)) {
        throw new \Exception($result->toString());
    }
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
        case version_compare($currentVersion, '1.2.1', '<'):
            $content[] = <<<EOF
<pre>
1.2.1
-----
+ Fixed permission issues with restricted users
+ Removed delete permission from normal users. Deity only.
+ Fixed error messages and checks in unassigned and assign forms.                
</pre>
EOF;
    }

    return TRUE;
}
