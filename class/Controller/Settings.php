<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace systemsinventory\Controller;

use systemsinventory\Factory\Settings as SettingsFactory;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class Settings extends \Http\Controller {

    public function get(\Request $request) {
        $data = array();
        $data['command'] = $request->shiftCommand();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Request $request) {
        $vars = $request->getRequestVars();
        if (empty($data['command']))
            $data['command'] = 'editPermissions';
        
        switch($data['command'])
        {
            case 'editPermissions':
                if(isset($vars['action']) && $vars['action'] == 'delete'){
                    SettingsFactory::deletePermissions($vars['user_id']);
                }
                $content = SettingsFactory::UserPermissionsView($data, $request);
                break;
            case 'editDepartments':
                $content = SettingsFactory::editDepartmentsView($data, $request);
                break;
            case 'editLocations':
                $content = SettingsFactory::editLocationsView($data, $request);
                break;
        }
        $view = new \View\HtmlView($content);
        return $view;
    }

    public function post(\Request $request) {
        $settingsFactory = new SettingsFactory;
        $vars = $request->getRequestVars();
        $data['command'] = $command = $request->shiftCommand();
        $isJson = false;
        
        switch ($command) {
            case 'editPermissions':
                $result = $settingsFactory->savePermissions($request);
                break;
            case 'editDepartments':
                $result = $settingsFactory->saveDepartment($request);
                $isJson = true;
                break;
            case 'editLocations':
                $result = $settingsFactory->saveLocation($request);
                $isJson = true;
                break;
            default:
                throw new Exception("Invalid command received in system settings. Command = $command");
        }
//        $device_id = $sdfactory->postDevice($request);
//        
//        $this->postSpecificDevice($request, $device_type, $device_id);
//        
//        $data['action'] = 'success';
        if($isJson){
            $view = new \View\JsonView(array('success' => TRUE));
        }else{
            $view = $this->getHtmlView($data, $request);
        }
        $response = new \Response($view);
        return $response;
    }
    
    public static function formatDepartmentList($row){
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_department');
        $tbl->addField('display_name');
        $tbl->addField('parent_department');
        $tbl->addField('description');
        $tbl->addField('active');
        $tbl->addField('id');
        $row['action'] = '<button id="edit-department" type="button" class="btn btn-sm btn-default" onclick="editDepartment('.$row['id'].')" >Edit</button>';
        if($row['active'])
            $row['dept_active'] = 'Yes';
        else
            $row['dept_active'] = 'No';
        if($row['parent_department']){
            $dept_id = $row['parent_department'];
            $tbl->addFieldConditional('id', $dept_id, '=');
            $dep_result = $db->select();
            if($dep_result){
                $row['parent_department'] = $dep_result[0]['display_name'];
            }
        }
        return $row;
    }

    public static function formatLocationList($row){
        $row['action'] = '<button id="edit-location" type="button" class="btn btn-sm btn-default" onclick="editLocation('.$row['id'].')" >Edit</button>';
        if($row['active'])
            $row['location_active'] = 'Yes';
        else
            $row['location_active'] = 'No';
        return $row;
    }
    
    protected function getJsonView($data, \Request $request) {
        $vars = $request->getRequestVars();
        $command = '';
        if(!empty($data['command']))
            $command = $data['command'];
        
        $system_details = '';
        switch ($command) {
            case 'editPermissions':
                $result = SettingsFactory::userPermissionsList($data, $request);
                break;
            case 'editDepartments':
                $result = SettingsFactory::departmentsList($data, $request);
                break;
            case 'editLocations':
                $result = SettingsFactory::locationsList($data, $request);
                break;
            case 'getDepartments':
                $result = SettingsFactory::getDepartmentByID($vars['department_id']);
                break;
            case 'getLocation':
                $result = SettingsFactory::getLocationByID($vars['location_id']);
                break;
            default:
                throw new Exception("Invalid command received in system controller getJsonView. Command = $command");
        }

        $view = new \View\JsonView($result);
        return $view;
    }
    
   

}
