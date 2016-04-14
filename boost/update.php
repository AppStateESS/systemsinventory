<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function systemsinventory_update($content, $currentVersion){
    switch($currentVersion){
        case version_compare($currentVersion,'1.0.0','<'):
            PHPWS_Core::initModClass('users', 'permission.php');
            User_Permission::registerPermissions('systemsinventory', $content);
            
    }
   
    return TRUE;
}