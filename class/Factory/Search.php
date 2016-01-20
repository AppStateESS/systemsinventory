<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\SystemDevice as Resource;
/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard
 */
class Search extends \ResourceFactory
{

  public static function form(\Request $request, $command=null)
    {
        javascript('jquery');
        \Form::requiredScript();

        $script = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/systems.js';
        \Layout::addJSHeader("<script type='text/javascript' src='$script'></script>");
	if(empty($command))
	  $command = 'run_search';
	$system_types = Search::getSystemTypes();
	$type_options = '<option value="0">All</opton>';
	foreach($system_types as $val){
	  $type_options .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
	}
	$vars['system_types'] = $type_options;
	$system_dep = Search::getSystemDepartments();
	$dep_optons = '<option value="0">All</opton>';
	foreach($system_dep as $val){
	  $dep_optons .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
	}
	$vars['departments'] = $dep_optons;
	$vars['form_action'] = "./systemsinventory/search/".$command;
        $template = new \Template($vars);
        $template->setModuleTemplate('systemsinventory', 'Search_System.html');
        return $template->get();
    }
  
  public function runSearch(\Request $request){
    $search_vars = $request->getVars();
    $search_vars = $search_vars['vars'];
    $db = \Database::getDB();
    $query = "SELECT * FROM systems_device";
    $where = '';

    if($search_vars['system_type']){
      $where = $this->addWhere('device_type_id='.$search_vars['system_type'], 'AND', $where);      
    }
    if($search_vars['department']){
      $where = $this->addWhere('department_id='.$search_vars['department'], 'AND', $where);      
    }
    if(!empty($search_vars['physical_id'])){
      $where = $this->addWhere('physical_id=\''.$search_vars['physical_id'].'\'', 'AND', $where);      
    }
    if(!empty($search_vars['model'])){
      $where = $this->addWhere('model like \'%'.$search_vars['model'].'%\'', 'AND', $where);      
    }
    if(!empty($search_vars['mac'])){
      $where = $this->addWhere('mac=\''.$search_vars['mac'].'\'', 'AND', $where);      
      $where = $this->addWhere('mac2=\''.$search_vars['mac'].'\'', 'OR', $where);      
    }
    if(!empty($search_vars['ip'])){
      $where = $this->addWhere('primary_ip like \'%'.$search_vars['ip'].'%\'', 'AND', $where);      
      $where = $this->addWhere('secondary_ip like \'%'.$search_vars['ip'].'%\'', 'OR', $where);      
    }
    if(!empty($search_vars['username'])){
      $where = $this->addWhere('username like \'%'.$search_vars['username'].'%\'', 'AND', $where);      
    }
    if(!empty($search_vars['purchase_date'])){
      $from_date = strtotime($search_vars['purchase_date']);
      $to_date = strtotime($search_vars['purchase_date'])+86400;
      if(empty($where))
	$where .= " WHERE purchase_date BETWEEN $from_date AND $to_date";      
      else
	$where .= " AND purchase_date BETWEEN $from_date AND $to_date";      
    }
    if(!empty($where))
      $query .= $where;

    $result = $db->query($query);
    return $result;
  }

  private function addWhere($sql, $cond, $where){
    if(empty($where)){
      $where = " WHERE $sql";
    }else{
      $where .= " $cond $sql";
    }
    return $where;
  }

  public static function getSystemTypes(){
    $db = \Database::getDB();
    $tbl = $db->addTable('systems_device_type');
    $tbl->addField('id');
    $tbl->addField('description');
    $result = $db->select();
    if(empty($result))
      return 0; //should be exception
    return $result;
  }

  public static function getSystemDepartments(){
    $db = \Database::getDB();
    $tbl = $db->addTable('systems_department');
    $tbl->addField('id');
    $tbl->addField('description');
    $result = $db->select();
    if(empty($result))
      return 0; //should be exception
    return $result;
  }
}