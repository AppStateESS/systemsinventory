<?php

namespace systemsinventory\Controller;

use systemsinventory\Factory\Search as Factory;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class Search extends \Http\Controller
{

    public function get(\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    protected function getHtmlView($data, \Request $request)
    {
        $content = Factory::form($request);
        $view = new \View\HtmlView($content);
        return $view;
    }

    protected function getJsonView($data, \Request $request){
      $db = \Database::newDB();
      $sd = $db->addTable('systems_device');
      $dbpager = new \DatabasePager($db);
      $dbpager->setHeaders(array('physical_id'=>'Physical ID', 'department_id'=>'Department','location_id'=>'Location','model'=>'Model','room_number'=>'Room Number', 'username'=>'Username','purchase_date'=>'Purchase Date'));
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
      $data = $dbpager->getJson();
      return parent::getJsonView($data, $request);
    }

    public function post(\Request $request){
      $factory = new Factory;

      \Pager::prepare();
      $template = new \Template;
      $template->setModuleTemplate('systemsinventory', 'search_results.html');

      $view = new \View\HtmlView($template->get());
      $response = new \Response($view);
      return $response;
    }
    
}
