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
        
        if(isset($vars['action']) && $vars['action'] == 'delete'){
            SettingsFactory::deletePermissions($vars['user_id']);
        }
        $content = SettingsFactory::UserPermissionsView($data, $request);
        
        $view = new \View\HtmlView($content);
        return $view;
    }

    public function post(\Request $request) {
        $settingsFactory = new SettingsFactory;
        $vars = $request->getRequestVars();
        $data['command'] = $command = $request->shiftCommand();
        
        switch ($command) {
            case 'editPermissions':
                $result = $settingsFactory->savePermissions($request);
                break;
            default:
                throw new Exception("Invalid command received in system settings. Command = $command");
        }
//        $device_id = $sdfactory->postDevice($request);
//        
//        $this->postSpecificDevice($request, $device_type, $device_id);
//        
//        $data['action'] = 'success';
        $view = $this->getHtmlView($data, $request);
        $response = new \Response($view);
        return $response;
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
            default:
                throw new Exception("Invalid command received in system controller getJsonView. Command = $command");
        }
        $view = new \View\JsonView($result);
        return $view;
    }
    
   

}
