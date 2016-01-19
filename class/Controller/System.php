<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\PC as PCFactory;
use systemsinventory\Factory\SystemDevice as SDFactory;
use systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class System extends \Http\Controller {

    public function get(\Request $request) {
        $data = array();
        $data['command'] = $request->shiftCommand();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Request $request) {
        $command = 'add';
        if (!empty($data['command']))
            $command = $data['command'];

        $content = SDFactory::form($request, 'system-pc', $command);
        $view = new \View\HtmlView($content);
        return $view;
    }

    public function post(\Request $request) {
        $pcfactory = new PCFactory;
        $sdfactory = new SDFactory;

        $device_id = $sdfactory->postDevice($request);
        $pcfactory->postNewPC($request, $device_id);

        // Need to add a command field to each form so you can switch and decided witch factory to use. ex. command=pc , command=server, etc...

        $data['command'] = 'success';
        $view = $this->getHtmlView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    public static function loadAdminBar() {
        $auth = \Current_User::getAuthorization();

        $nav_vars['is_deity'] = \Current_user::isDeity();
        $nav_vars['logout_uri'] = $auth->logout_link;
        $nav_vars['username'] = \Current_User::getDisplayName();
        $nav_bar = new \Template($nav_vars);
        $nav_bar->setModuleTemplate('systemsinventory', 'navbar.html');
        $content = $nav_bar->get();
        \Layout::plug($content, 'NAV_LINKS');
    }

    protected function getJsonView($data, \Request $request) {
        $vars = $request->getVars();
        $sys_id = $vars['vars']['system_id'];
        $command = '';
        if(!empty($data['command']))
            $command = $data['command'];
        
        $system_details = '';
        switch ($command) {
            case 'getDetails':
                $system_details = $this->getSystemDetails($sys_id);
                break;
        }
        $view = new \View\JsonView($system_details);
        return $view;
    }
    
    public function getSystemDetails($system_id){
        if(empty($system_id)){
            throw new Exception("System ID invalid.");
        }
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_device');
        $tbl->addFieldConditional('id', $system_id);
        $result = $db->select();
        $system_type = $result['0']['device_type_id'];
        switch($system_type){
            case '1':
            case '2':
                $table = 'systems_pc';
                break;
            case '3':
                $table = 'systems_ipad';
                break;
            case '4':
                $table = 'systems printer';
                break;
            case '5':
                $table = 'systems_camera';
                break;
            case '6':
                $table = 'systems_digital_sign';
                break;
            case '7':
                $table = 'systems_timeclock';
                break;
            default:
                $table = 'systems_pc';
        }
        $device_db = \Database::getDB();
        $device_table = $device_db->addTable($table);
        $device_table->addFieldConditional('device_id', $system_id);
        $result = $device_db->select();
        return $result;
    }

}
