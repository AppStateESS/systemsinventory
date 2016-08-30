<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\Search as Factory;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class Search extends \Http\Controller {

    public $search_params = NULL;

    public function get(\Request $request) {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Request $request) {
        $content = Factory::form($request);
        $view = new \View\HtmlView($content);
        return $view;
    }

    protected function getJsonView($data, \Request $request) {
        $db = \Database::newDB();
        $sd = $db->addTable('systems_device');
        $system_dep = \systemsinventory\Factory\SystemDevice::getSystemDepartments();
        $conditional = $this->createSearchConditional($db);
        if (!empty($conditional))
            $db->addConditional($conditional);
        $dbpager = new \DatabasePager($db);
        $dbpager->setHeaders(array('physical_id' => 'Physical ID', 'department_id' => 'Department', 'location_id' => 'Location', 'model' => 'Model', 'room_number' => 'Room Number', 'username' => 'Username', 'purchase_date' => 'Purchase Date'));
        $tbl_headers['physical_id'] = $sd->getField('physical_id');
        $tbl_headers['department_id'] = $sd->getField('department_id');
        $tbl_headers['location_id'] = $sd->getField('location_id');
        $tbl_headers['model'] = $sd->getField('model');
        $tbl_headers['room_number'] = $sd->getField('room_number');
        $tbl_headers['username'] = $sd->getField('username');
        $tbl_headers['purchase_date'] = $sd->getField('purchase_date');
        $dbpager->setTableHeaders($tbl_headers);
        $dbpager->setId('device-list');
        $dbpager->setRowIdColumn('id');
        $dbpager->setCallback(array('\systemsinventory\Controller\Search', 'alterSearchRow'));
        $data = $dbpager->getJson();
        return parent::getJsonView($data, $request);
    }

    private function createSearchConditional($db) {
        if (empty($_SESSION['system_search_vars'])) {
            $conditional = NULL;
        } else {
            $search_vars = $_SESSION['system_search_vars'];

            if ($search_vars['system_type']) {
                $conditional = new \Database\Conditional($db, 'device_type_id', $search_vars['system_type'], '=');
            }
            if ($search_vars['department']) {
                $tmp_cond = new \Database\Conditional($db, 'department_id', $search_vars['department'], '=');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                
            }else {
                $cond = NULL;
                foreach ($system_dep as $val) {
                    $tmp_cond = new \Database\Conditional($db, 'department_id', $val['id'], '=');
                    $cond = $this->addSearchConditional($db, $cond, $tmp_cond, 'OR');
                }
                $conditional = $this->addSearchConditional($db, $conditional, $cond, 'AND');
            }
            if ($search_vars['location']) {
                $tmp_cond = new \Database\Conditional($db, 'location_id', $search_vars['location'], '=');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
            if (!empty($search_vars['physical_id'])) {
                $tmp_cond = new \Database\Conditional($db, 'physical_id', $search_vars['physical_id'], 'like');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
            if (!empty($search_vars['model'])) {
                $tmp_cond = new \Database\Conditional($db, 'model', "%" . $search_vars['model'] . "%", 'like');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
            if (!empty($search_vars['username'])) {
                $tmp_cond = new \Database\Conditional($db, 'username', "%" . $search_vars['username'] . "%", 'LIKE');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
            if (!empty($search_vars['purchase_date'])) {
                $from_date = strtotime($search_vars['purchase_date']);
                $to_date = strtotime($search_vars['purchase_date']) + 86400;
                $tmp_cond = new \Database\Conditional($db, 'purchase_date', $from_date, '>');
                $tmp_cond1 = new \Database\Conditional($db, 'purchase_date', $to_date, '<');
                $tmp_cond = new \Database\Conditional($db, $tmp_cond, $tmp_cond1, 'AND');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
            if (!empty($search_vars['ip'])) {
                $tmp_cond = new \Database\Conditional($db, 'primary_ip', "%" . $search_vars['ip'] . "%", 'like');
                $tmp_cond1 = new \Database\Conditional($db, 'secondary_ip', "%" . $search_vars['ip'] . "%", 'like');
                $tmp_cond = new \Database\Conditional($db, $tmp_cond, $tmp_cond1, 'OR');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
            if (!empty($search_vars['mac'])) {
                $tmp_cond = new \Database\Conditional($db, 'mac', "%" . $search_vars['mac'] . "%", 'like');
                $tmp_cond1 = new \Database\Conditional($db, 'mac2', "%" . $search_vars['mac'] . "%", 'like');
                $tmp_cond = new \Database\Conditional($db, $tmp_cond, $tmp_cond1, 'OR');
                $conditional = $this->addSearchConditional($db, $conditional, $tmp_cond, 'AND');                                
            }
        }
        return $conditional;
    }
    
    private function addSearchConditional($db, $conditional, $tmp_cond, $operator){
        if (empty($conditional)){
            $conditional = $tmp_cond;
        }else{
            $conditional = new \Database\Conditional($db, $conditional, $tmp_cond, $operator);    
        }
        return $conditional;
    }
    
    /**
     * Format the search row by translating id's to names and formatting the date to human readable
     * 
     * @param array $row
     * @return array
     */
    public static function alterSearchRow($row) {
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
    public function post(\Request $request) {
        $script = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/sys_pager.js';
        $source_http = PHPWS_SOURCE_HTTP;
        \Layout::addJSHeader("<script type='text/javascript'>var source_http = '$source_http';</script>");
        \Layout::addLink("<script type='text/javascript' src='$script'></script>");

        $factory = new Factory;
        $search_vars = $request->getVars();
        $_SESSION['system_search_vars'] = $search_vars['vars'];
        \Pager::prepare();
        $template = new \Template;
        $template->setModuleTemplate('systemsinventory', 'search_results.html');

        $view = new \View\HtmlView($template->get());
        $response = new \Response($view);
        return $response;
    }

}
