<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\PC as PCFactory;
use systemsinventory\Factory\IPAD as IPADFactory;
use systemsinventory\Factory\Printer as PrinterFactory;
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
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
        $sdfactory = new SDFactory;
        $vars = $request->getRequestVars();
        $device_type = PC;
        
        if(isset($vars['server'])){
            $device_type = SERVER;
        }elseif(isset($vars['device_type'])){
            $device_type = $vars['device_type'];
        }
        $device_id = $sdfactory->postDevice($request);
        
        switch ($device_type) {
            case SERVER:
            case PC:
                $pcfactory = new PCFactory;
                $pcfactory->postNewPC($request, $device_id);
                break;
            case IPAD:
                $ipadfactory = new IPADFactory;
                $ipadfactory->postNewIPAD($request, $device_id);
                break;
            case PRINTER:
                $printerfactory = new PrinterFactory;
                $printerfactory->postNewPrinter($request, $device_id);
                break;
            default:
                break;
        }


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
                $system_details = SDFactory::getSystemDetails($sys_id);
                break;
        }
        $view = new \View\JsonView($system_details);
        return $view;
    }
    
    

}
