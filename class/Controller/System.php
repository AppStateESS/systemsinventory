<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\PC as PCFactory;
use systemsinventory\Factory\IPAD as IPADFactory;
use systemsinventory\Factory\Printer as PrinterFactory;
use systemsinventory\Factory\Camera as CameraFactory;
use systemsinventory\Factory\DigitalSign as DigitalSignFactory;
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
        if (empty($data['command']))
            $data['command'] = 'add';

        if (\Current_User::allow('systemsinventory', 'edit')) {
            if ($data['command'] == 'editPermissions')
                $content = SDFactory::UserPermissionsView($data, $request);
            else
                $content = SDFactory::form($request, 'system-pc', $data);
        }else {
            $content = '<div class="alert alert-danger" id="add-system-error">You do not have permissions to edit! Please contact your systems administrator if you believe this to be an error.</div>';
        }
        $view = new \View\HtmlView($content);
        return $view;
    }

    public function post(\Request $request) {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
        $sdfactory = new SDFactory;
        $vars = $request->getRequestVars();
        $isJSON = false;
        $data['command'] = $request->shiftCommand();

        if (!empty($vars['device_id']) && empty($vars['profile_name']))
            $isJSON = true;
        $device_type = PC;

        if (isset($vars['server'])) {
            $device_type = SERVER;
        } elseif (isset($vars['device_type'])) {
            $device_type = $vars['device_type'];
        }
        $device_id = $sdfactory->postDevice($request);

        $this->postSpecificDevice($request, $device_type, $device_id);

        $data['action'] = 'success';
        if ($isJSON) {
            $view = new \View\JsonView(array('success' => TRUE));
        } else {
            $view = $this->getHtmlView($data, $request);
        }
        $response = new \Response($view);
        return $response;
    }

    public function postSpecificDevice(\Request $request, $device_type, $device_id) {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");

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
            case CAMERA:
                $camerafactory = new CameraFactory;
                $camerafactory->postNewCamera($request, $device_id);
                break;
            case DIGITAL_SIGN:
                $digitalsignfactory = new DigitalSignFactory;
                $digitalsignfactory->postNewDigitalSign($request, $device_id);
                break;
            case TIME_CLOCK:
                break;
            default:
                break;
        }
    }

    public static function loadAdminBar() {
        $auth = \Current_User::getAuthorization();

        $nav_vars['is_deity'] = \Current_user::isDeity();
        $nav_vars['logout_uri'] = $auth->logout_link;
        $nav_vars['username'] = \Current_User::getDisplayName();
        if (\Current_User::allow('systemsinventory', 'edit'))
            $nav_vars['add'] = '<a href="systemsinventory/system/add"><i class="fa fa-plus"></i> Add System</a>';
        if (\Current_User::allow('systemsinventory', 'view'))
            $nav_vars['search'] = '<a href="systemsinventory/search"><i class="fa fa-search"></i> Search Systems</a>';
        if (\Current_User::allow('systemsinventory', 'reports'))
            $nav_vars['reports'] = '<a href="systemsinventory/reports"><i class="fa fa-area-chart"></i> Reports</a>';
        if (\Current_User::allow('systemsinventory', 'settings'))
            $nav_vars['settings'] = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="fa fa-cog"></i> Settings</a>';


        $nav_bar = new \Template($nav_vars);
        $nav_bar->setModuleTemplate('systemsinventory', 'navbar.html');
        $content = $nav_bar->get();
        \Layout::plug($content, 'NAV_LINKS');
    }

    protected function getJsonView($data, \Request $request) {
        $vars = $request->getRequestVars();
        $command = '';
        if (!empty($data['command']))
            $command = $data['command'];

        if ($command == 'getDetails' && \Current_User::allow('systemsinventory', 'view')) {
            $result = SDFactory::getSystemDetails($vars['device_id'], $vars['row_index']);
        } else if (\Current_User::allow('systemsinventory', 'edit')) {
            $system_details = '';
            switch ($command) {
                case 'searchUser':
                    $result = SDFactory::searchUserByUsername($vars['username']);
                    break;
                case 'getUser':
                    $result = SDFactory::getUserByUsername($vars['username']);
                    break;
                case 'getProfile':
                    $result = SDFactory::getProfile($vars['profile_id']);
                    break;
                case 'searchPhysicalID':
                    $result = SDFactory::searchPhysicalID($vars['physical_id']);
                    break;
                case 'delete':
                    $result = SDFactory::deleteDevice($vars['device_id'], $vars['specific_device_id'], $vars['device_type_id']);
                    break;
                default:
                    throw new Exception("Invalid command received in system controller getJsonView. Command = $command");
            }
        } else {
            $result = array('Error');
        }
        
        $view = new \View\JsonView($result);
        return $view;
    }

}
