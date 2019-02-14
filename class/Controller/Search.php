<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\Search as Factory;
use systemsinventory\Factory\React;
use systemsinventory\Factory\SystemDevice;
use phpws2\Database;
use phpws2\Database\Conditional;

/**
 * Search row increments
 */
define('SYSINV_ROWS', 50);

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class Search extends \phpws2\Http\Controller
{

    public $search_params = NULL;

    public function get(\Canopy\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Canopy\Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Canopy\Request $request)
    {
        \Layout::addStyle('systemsinventory');
        $command = $request->shiftCommand();
        switch ($command) {
            case 'download':
                $content = $this->download($request);
                break;

            default:
                $content = $this->view();
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    private function view()
    {
        $content = SystemDevice::getFilterScript() . SystemDevice::getProfilesJson() . React::view('search');
        return $content;
    }

    private function download($request)
    {
        $system_type = $request->pullGetArray('systemType', true);
        $status_type = $request->pullGetInteger('statusType', true);
        $file_name = \Canopy\TextString::randomString(12) . '.csv';
        $file_location = "/tmp/$file_name";

        if (empty($system_type)) {
            $result = null;
        } else {
            $factory = new Factory;
            $factory->offset = -1;
            $factory->status_type = $status_type;
            $result = $factory->getDevices($request);
            if (empty($result)) {
                return 'No results found';
            }
            $fp = fopen($file_location, 'w');

            fputcsv($fp, array_keys($result[0]));

            foreach ($result as $row) {
                fputcsv($fp, $row);
            }
            fclose($fp);
        }
        header("Content-Type: application/octet-stream");
        header("Content-Transfer-Encoding: Binary");
        header("Content-disposition: attachment; filename=\"$file_name\"");
        echo readfile($file_location);
        exit();
    }

    protected function getJsonView($data, \Canopy\Request $request)
    {
        $total = 0;
        $total_shown = 0;
        $more = false;
        $system_type = $request->pullGetArray('systemType', true);
        $status_type = $request->pullGetInteger('statusType', true);

        $user_restrictions = \systemsinventory\Factory\SystemDevice::getUserPermissions(\Current_User::getId());
        $restricted = !empty($user_restrictions);
        // If a system type is not chosen OR this is a restricted user
        // trying to view unassigned or surplus devices then return a null result
        if (empty($system_type) || ($restricted && $status_type != 2)) {
            $result = null;
        } else {
            $factory = new Factory;
            $offsetMult = $request->pullGetInteger('offset', true);
            $factory->offset = $offsetMult;
            $factory->status_type = $status_type;
            $result = $factory->getDevices($request);

            if ($result) {
                // Total number of rows not adjusted for limit
                if (isset($result[0])) {
                    $total = $result[0]['full_count'];
                }

                $row_count = count($result);

                if ($row_count === SYSINV_ROWS) {
                    $more = true;
                    $total_shown = ($offsetMult + 1) * SYSINV_ROWS;
                } else if ($row_count < SYSINV_ROWS) {
                    $more = false;
                    $total_shown = $total;
                } else {
                    // $row_count > SYSINV_ROWS
                    $more = false;
                    $total_shown = $row_count;
                }
            }
        }
        return parent::getJsonView(array('restricted' => $restricted, 'listing' => $result, 'total' => $total, 'shown' => $total_shown, 'more' => $more),
                        $request);
    }

    /**
     * Handle the submit from the search form.
     * 
     * @param \Request $request
     * @return \Response
     */
    public function post(\Canopy\Request $request)
    {
        $script = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/sys_pager.js';
        $source_http = PHPWS_SOURCE_HTTP;
        \Layout::addJSHeader("<script type='text/javascript'>var source_http = '$source_http';</script>");
        \Layout::addLink("<script type='text/javascript' src='$script'></script>");

        $factory = new Factory;
        $search_vars = $request->getVars();
        $_SESSION['system_search_vars'] = $search_vars['vars'];
        \phpws2\Pager::prepare();
        $template = new \phpws2\Template;
        $template->setModuleTemplate('systemsinventory', 'search_results.html');

        $view = new \phpws2\View\HtmlView($template->get());
        $response = new \Canopy\Response($view);
        return $response;
    }

}
