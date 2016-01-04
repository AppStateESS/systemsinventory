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
	$type_options = '<option value="all">All</opton>';
	foreach($system_types as $val){
	  $type_options .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
	}
	$vars['system_types'] = $type_options;
	$system_dep = Search::getSystemDepartments();
	$dep_optons = '<option value="all">All</opton>';
	foreach($system_dep as $val){
	  $dep_optons .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
	}
	$vars['departments'] = $dep_optons;
	$vars['form_action'] = "./systemsinventory/system/".$command;
        $template = new \Template($vars);
        $template->setModuleTemplate('systemsinventory', 'Search_System.html');
        return $template->get();
    }
  
  public function runSearch(\Request $request){

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