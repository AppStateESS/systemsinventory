<?php

function runDbMigration($fileName)
{
    $db = new PHPWS_DB();
    $result = $db->importFile(PHPWS_SOURCE_DIR . 'mod/systemsinventory/boost/updates/' . $fileName);
    if (PEAR::isError($result)) {
        throw new \Exception($result->toString());
    }
}
function systemsinventory_update($content, $currentVersion){
    switch($currentVersion){
        case version_compare($currentVersion,'1.0.0','<'):
            PHPWS_Core::initModClass('users', 'permission.php');
            User_Permission::registerPermissions('systemsinventory', $content);
            
        case version_compare($currentVersion,'1.0.2','<'):
            runDbMigration('update_1_0_2.sql');
            
        case version_compare($currentVersion,'1.0.3','<'):
            runDbMigration('update_1_0_3.sql');
            
        case version_compare($currentVersion,'1.0.4','<'):
            runDbMigration('update_1_0_4.sql');
            
    }
   
    return TRUE;
}