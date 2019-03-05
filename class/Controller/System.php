<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\PC as PCFactory;
use systemsinventory\Factory\Laptop as LaptopFactory;
use systemsinventory\Factory\IPAD as IPADFactory;
use systemsinventory\Factory\Printer as PrinterFactory;
use systemsinventory\Factory\Camera as CameraFactory;
use systemsinventory\Factory\DigitalSign as DigitalSignFactory;
use systemsinventory\Factory\SystemDevice as SDFactory;
use systemsinventory\Factory\React;
use systemsinventory\Resource;

require_once(PHPWS_SOURCE_DIR . 'mod/systemsinventory/config/device_types.php');

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class System extends \phpws2\Http\Controller
{

    public function get(\Canopy\Request $request)
    {
        $data = array();
        $data['command'] = $request->shiftCommand();
        $view = $this->getView($data, $request);
        $response = new \Canopy\Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Canopy\Request $request)
    {
        \Layout::addStyle('systemsinventory');
        $command = $data['command'];

        switch ($command) {
            case 'add':
                if (!\Current_User::allow('systemsinventory', 'edit')) {
                    return $this->permissionErrorView();
                }
                $content = SDFactory::getProfilesJson() . SDFactory::getFilterScript() . React::view('add');
                break;

            //view is default
            default:
                $id = $request->pullGetInteger('id', true);
                if (empty($id)) {
                    $id = $request->lastCommand();
                }
                if (is_numeric($id)) {
                    $content = SDFactory::view($id);
                } else {
                    \phpws2\Error::errorPage('404');
                }
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function delete(\Canopy\Request $request)
    {
        if (!\Current_User::isDeity()) {
            throw new \Exception('No permission for device deletion');
        }
        $command = $request->shiftCommand();
        if (empty($command)) {
            throw new \Exception('Bad delete command');
        }
        switch ($command) {
            case 'profile':
                if (!\Current_User::allow('systeminventory', 'settings')) {
                    return $this->permissionErrorView();
                }
                SDFactory::deleteDevice($request->pullDeleteInteger('profile'));
                break;

            case 'device':
                SDFactory::deleteDevice($request->pullDeleteInteger('device_id'));
                break;
        }

        $view = new \phpws2\View\JsonView(array('success' => true));
        $response = new \Canopy\Response($view);
        return $response;
    }

    public function patch(\Canopy\Request $request)
    {
        if (!\Current_User::allow('systemsinventory', 'edit')) {
            return $this->permissionErrorView();
        }
        $factory = new SDFactory;
        $command = $request->shiftCommand();
        switch ($command) {
            case 'assign':
                $factory->assign($request);
                break;

            case 'unassign':
                $factory->unassign($request);
                break;

            case 'surplus':
                $factory->surplus($request);
                break;

            case 'stolen':
                $factory->stolen($request);
                break;

            default:
                throw new \Exception('Unknown patch command');
        }

        $view = new \phpws2\View\JsonView(array('success' => true));
        $response = new \Canopy\Response($view);
        return $response;
    }

    private function permissionErrorView()
    {
        $content = '<div class="alert alert-danger" id="add-system-error">You do not have permissions to edit! Please contact your systems administrator if you believe this to be an error.</div>';
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function post(\Canopy\Request $request)
    {
        if (!\Current_User::allow('systemsinventory', 'edit')) {
            return $this->permissionErrorView();
        }

        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
        $sdfactory = new SDFactory;
        $device = $sdfactory->postDevice($request);
        if(!$request->pullPostInteger('id', true)){
            $sdfactory->markDeviceInventoried($device->getId());
        }
        // Time clock doesn't have data outside the default device
        if ($device->getDeviceType() !== TIME_CLOCK) {
            $this->postSpecificDevice($request, $device);
        }

        if (!empty($request->postVarIsset('profile_name'))) {
            // returning id and profile name to update the form
            $view = new \phpws2\View\JsonView(array('success' => TRUE, 'id' => $device->getId(), 'name' => $device->getProfileName()));
        } else {
            $view = new \phpws2\View\JsonView(array('success' => TRUE));
        }
        $response = new \Canopy\Response($view);
        return $response;
    }

    public function postSpecificDevice(\Canopy\Request $request, $device)
    {
        $specific_device = SDFactory::loadSpecificByDevice($device);
        switch ($device->getDeviceType()) {
            case SERVER:
            case PC:
                $pcfactory = new PCFactory;
                $pcfactory->postNewPC($request, $specific_device);
                break;
            case LAPTOP:
                $laptopfactory = new LaptopFactory;
                $laptopfactory->postNewLaptop($request, $specific_device);
                break;
            case IPAD:
                $ipadfactory = new IPADFactory;
                $ipadfactory->postNewIPAD($request, $specific_device);
                break;
            case PRINTER:
                $printerfactory = new PrinterFactory;
                $printerfactory->postNewPrinter($request, $specific_device);
                break;
            case CAMERA:
                $camerafactory = new CameraFactory;
                $camerafactory->postNewCamera($request, $specific_device);
                break;
            case DIGITAL_SIGN:
                $digitalsignfactory = new DigitalSignFactory;
                $digitalsignfactory->postNewDigitalSign($request,
                        $specific_device);
                break;
            case TIME_CLOCK:
                break;
            default:
                break;
        }
    }

    public static function loadAdminBar()
    {
        $auth = \Current_User::getAuthorization();

        $nav_vars['is_deity'] = \Current_user::isDeity();
        $nav_vars['logout_uri'] = $auth->logout_link;
        $nav_vars['username'] = \Current_User::getDisplayName();
        if (\Current_User::allow('systemsinventory', 'edit')) {
            $nav_vars['add'] = '<a class="dropdown-item" href="systemsinventory/system/add"><i class="fa fa-plus"></i> Add System</a>';
        }
        if (\Current_User::allow('systemsinventory', 'view')) {
            $nav_vars['search'] = '<a class="dropdown-item" href="systemsinventory/search"><i class="fa fa-search"></i> Search Systems</a>';
        }
        if (\Current_User::allow('systemsinventory', 'reports')) {
            $nav_vars['reports'] = '<a class="dropdown-item" href="systemsinventory/reports"><i class="fas fa-chart-bar"></i> Reports</a>';
        }
        if (\Current_User::allow('systemsinventory', 'settings')) {
            $nav_vars['settings'] = '<a class="dropdown-item" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="fa fa-cog"></i> Settings</a>';
        }


        $nav_bar = new \phpws2\Template($nav_vars);
        $nav_bar->setModuleTemplate('systemsinventory', 'navbar.html');
        $content = $nav_bar->get();
        \Layout::plug($content, 'NAV_LINKS');
    }

    protected function getJsonView($data, \Canopy\Request $request)
    {
        $vars = $request->getRequestVars();
        $command = '';
        if (!empty($data['command']))
            $command = $data['command'];

        if ($command == 'getDetails' && \Current_User::allow('systemsinventory',
                        'view')) {
            $result = SDFactory::getSystemDetails($vars['device_id']);
        } else if (\Current_User::allow('systemsinventory', 'edit')) {
            $system_details = '';
            switch ($command) {
                case 'searchUser':
                    $result = SDFactory::searchUserByUsername($vars['username']);
                    //var_dump($result);
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
                case 'inventory':
                    $result = SDFactory::markDeviceInventoried($vars['device_id']);
                    break;
                case 'getDeviceAudits':
                    $result = SDFactory::getDeviceAudits($vars['device_id']);
                    break;
                default:
                    throw new \Exception("Invalid command received in system controller getJsonView. Command = $command");
            }
        } else {
            $result = array('Error');
        }

        $view = new \phpws2\View\JsonView($result);
        return $view;
    }

}
