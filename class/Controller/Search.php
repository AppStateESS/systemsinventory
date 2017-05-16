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
//$content = Factory::form($request);
        $content = $this->getFilterScript() . React::view('search');
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    protected function getFilterScript()
    {
        $filter = $this->getSearchFilterJson();
        return <<<EOF
<script>const jsonFilters = $filter</script>
EOF;
    }

    protected function getSearchFilterJson()
    {
        $filters = $this->getJsonSearchFilters();
        return json_encode($filters);
    }

    protected function getJsonSearchFilters()
    {
        $system_types = SystemDevice::getSystemTypes();
        foreach ($system_types as $val) {
            $filters['system_types'][] = array('value' => $val['id'], 'label' => $val['description']);
        }
        $departments = SystemDevice::getSystemDepartments();
        foreach ($departments as $val) {
            $filters['departments'][] = array('value' => $val['id'], 'label' => $val['display_name']);
        }
        $locations = SystemDevice::getSystemLocations();
        foreach ($locations as $val) {
            $filters['locations'][] = array('value' => $val['id'], 'label' => $val['display_name']);
        }
        return $filters;
    }

    protected function getJsonView($data, \Canopy\Request $request)
    {
        $total = 0;
        $total_shown = 0;
        $more = false;
        $system_type = $request->pullGetArray('systemType', true);
        $offset = 0;

        if (empty($system_type)) {
            $result = null;
        } else {
            $db = Database::getDB();
            $sd = $db->addTable('systems_device');
            $deptbl = $db->addTable('systems_department');
            $loctbl = $db->addTable('systems_location');
            $deptbl->addField('display_name', 'department_name');
            $loctbl->addField('display_name', 'location_name');
            $exp = new \phpws2\Database\Expression('systems_device.*, count(*) OVER() as full_count');
            $sd->addField($exp);
            $db->joinResources($sd, $deptbl,
                    new Conditional($db, $sd->getField('department_id'),
                    $deptbl->getField('id'), '='));
            $db->joinResources($sd, $loctbl,
                    new Conditional($db, $sd->getField('location_id'),
                    $loctbl->getField('id'), '='));
            $conditional = $this->createSearchConditional($db, $sd, $request);
            if (!empty($conditional)) {
                $db->addConditional($conditional);
            }

            $offsetMult = $request->pullGetInteger('offset', true);
            // -1 means show everything at once
            if ($offsetMult !== -1) {
                $db->setLimit(SYSINV_ROWS, SYSINV_ROWS * $offsetMult);
            }

            $result = $db->select();
            if ($result) {
                // Total number of rows not adjusted for limit
                if (isset($result[1])) {
                    $total = $result[1]['full_count'];
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

        return parent::getJsonView(array('listing' => $result, 'total' => $total, 'shown' => $total_shown, 'more' => $more),
                        $request);
    }

    private function createSearchConditional(\phpws2\Database\DB $db,
            \phpws2\Database\Table $tbl, $request)
    {
        $conditional = NULL;
        $system_dep = \systemsinventory\Factory\SystemDevice::getSystemDepartments();

        $system_type = $request->pullGetArray('systemType', true);
        $department_id = $request->pullGetString('department', true);
        $location_id = $request->pullGetString('location', true);
        $physical_id = $request->pullGetString('physicalId', true);
        $model = $request->pullGetString('model', true);
        $username = $request->pullGetString('username', true);
        $purchase_date = $request->pullGetString('purchaseDate', true);
        $ip = $request->pullGetString('ipAddress', true);
        $mac = $request->pullGetString('macAddress', true);

        if ($system_type[0] !== 'all') {
            $tbl->addFieldConditional('device_type_id', $system_type, 'in');
        }

        foreach ($system_dep as $val) {
            $permitted_ids[] = $val['id'];
        }

        if ($department_id && in_array($department_id, $permitted_ids)) {
            $tbl->addFieldConditional('department_id', $department_id);
        } else {
            $tbl->addFieldConditional('department_id', $permitted_ids, 'in');
        }

        if ($location_id) {
            $tbl->addFieldConditional('location_id', $location_id);
        }

        if (!empty($physical_id)) {
            $tbl->addFieldConditional('physical_id', "%$physical_id%", 'like');
        }

        if (!empty($model)) {
            $tbl->addFieldConditional('model', "%$model%", 'like');
        }

        if (!empty($username)) {
            $tbl->addFieldConditional('username', "%$username%", 'LIKE');
        }

        if (!empty($purchase_date)) {
            $from_date = strtotime($purchase_date);
            $to_date = strtotime($purchase_date) + 86400;
            $tbl->addFieldConditional('purchase_date', $from_date, '>');
            $tbl->addFieldConditional('purchase_date', $to_date, '<');
        }

        if (!empty($ip)) {
            $c1 = $tbl->getFieldConditional('primary_ip', "%$ip%", 'like');
            $c2 = $tbl->getFieldConditional('secondary_ip', "%$ip%", 'like');
            $db->addConditional($c1, $c2, 'or');
        }

        if (!empty($search_vars['mac'])) {
            $c1 = $tbl->getFieldConditional('mac', "%$mac%", 'like');
            $c2 = $tbl->getFieldConditional('mac2', "%$mac%", 'like');
            $db->addConditional($c1, $c2, 'or');
        }
        return $conditional;
    }

    /**
     * Format the search row by translating id's to names and formatting the date to human readable
     *
     * @param array $row
     * @return array
     */
    public static function alterSearchRow($row)
    {
        $row['department_id'] = \systemsinventory\Factory\SystemDevice::getDepartmentByID($row['department_id']);
        $row['location_id'] = \systemsinventory\Factory\SystemDevice::getLocationByID($row['location_id']);
        $row['purchase_date'] = date('n/d/Y', $row['purchase_date']);
        return $row;
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
