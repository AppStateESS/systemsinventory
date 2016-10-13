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
    
	if(empty($command))
	  $command = 'run_search';
        $system_locations = \systemsinventory\Factory\SystemDevice::getSystemLocations();
        $location_options = '<option value="0">All</opton>';
        foreach($system_locations as $val){
            $location_options .= '<option value="'.$val['id'].'">'.$val['display_name'].'</option>';
	}
        $vars['locations'] = $location_options;
	$system_types = \systemsinventory\Factory\SystemDevice::getSystemTypes();
	$type_options = '<option value="0">All</opton>';
	foreach($system_types as $val){
            $type_options .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
	}
	$vars['system_types'] = $type_options;
	$system_dep = \systemsinventory\Factory\SystemDevice::getSystemDepartments();
	$dep_optons = '<option value="0">All</opton>';
	foreach($system_dep as $val){
	  $dep_optons .= '<option value="'.$val['id'].'">'.$val['display_name'].'</option>';
	}
	$vars['departments'] = $dep_optons;
	$vars['form_action'] = "./systemsinventory/search/".$command;
        $template = new \Template($vars);
        $template->setModuleTemplate('systemsinventory', 'Search_System.html');
        return $template->get();
    }
  
}