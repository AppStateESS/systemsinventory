<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\Settings as Resource;
use systemsinventory\Resource\Department as DeptResource;
use systemsinventory\Resource\Location as LocResource;
/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard
 */
class Settings extends \ResourceFactory
{
    public static function userPermissionsView($data, $request){

        $departments = SystemDevice::getSystemDepartments();
        $dep_options = '';
 
        $vars['js'] = "<script type='text/javascript' src='".PHPWS_SOURCE_HTTP."mod/systemsinventory/javascript/bootstrap-multiselect.js'></script>";
        $vars['css'] = "<link rel='stylesheet' href='".PHPWS_SOURCE_HTTP."mod/systemsinventory/css/bootstrap-multiselect.css'/>";

        foreach($departments as $val){
            if($val['id'] != 1)
                $dep_options .= '<option value="'.$val['id'].'">'.$val['display_name'].'</option>';
        }
        $vars['departments'] = $dep_options;
        $users = Settings::getPHPWSUsers();
        $user_options = '';
        foreach($users as $user){
            $user_options .= '<option value="'.$user['id'].'">'.$user['username'].'</option>';
        }
        $vars['users'] = $user_options;
        
        \Pager::prepare();
        $template = new \Template;
        $template = new \Template($vars);
        $template->setModuleTemplate('systemsinventory', 'Edit_Permissions.html');
        return $template->get();
    }
    
    public static function editLocationsView($data, $request){
        $vars = array();
        $locations = SystemDevice::getSystemLocations();
        $loc_options = '';
        
        $loc_options .= '<option value="1">NONE</option>';
 
        foreach($locations as $val){
            if($val['id'] != 1){
                $loc_options .= '<option value="'.$val['id'].'">'.$val['display_name'].'</option>';
            }
        }
        $vars['locations'] = $loc_options;
        $script = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/edit_loc.js';
        \Layout::addLink("<script type='text/javascript' src='$script'></script>");
        $vars['add'] = '<a href="#" class="btn btn-md btn-success" data-toggle="modal" data-target="#edit-location-modal"><i class="fa fa-plus">&nbsp;</i>Add Location</a>';
        \Pager::prepare();
        $template = new \Template;
        $template = new \Template($vars);
        $template->setModuleTemplate('systemsinventory', 'Edit_Locations.html');
        return $template->get();
        
    }
    public static function locationsList($data, $request){
        $rows = array();
        $no_location = 1;
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_location');
        $tbl->addField('display_name');
        $tbl->addField('description');
        $tbl->addField('active');
        $tbl->addField('id');
        $tbl->addFieldConditional('id', '1', '!=');
        $tbl->addOrderBy('display_name');
        $pager = new \DatabasePager($db);
        $pager->setCallback(array('\systemsinventory\Controller\Settings','formatLocationList'));
        $pager->setId('location-list');
        $pager->setRowIdColumn('id');
        $pager->setHeaders(array('display_name'=>'Name','description'=>'Description','location_active'=>'Is Active'));
        $data = $pager->getJson();
        return $data;
    }
    
    public static function editDepartmentsView($data, $request){
        $vars = array();
        $departments = SystemDevice::getSystemDepartments();
        $dep_options = '';
        
        $dep_options .= '<option value="1">NONE</option>';
 
        foreach($departments as $val){
            if($val['id'] != 1){
                $dep_options .= '<option value="'.$val['id'].'">'.$val['display_name'].'</option>';
            }
        }
        $vars['departments'] = $dep_options;
        $script = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/edit_dept.js';
        \Layout::addLink("<script type='text/javascript' src='$script'></script>");
        $vars['add'] = '<a href="#" class="btn btn-md btn-success" data-toggle="modal" data-target="#edit-department-modal"><i class="fa fa-plus">&nbsp;</i>Add Department</a>';
        \Pager::prepare();
        $template = new \Template;
        $template = new \Template($vars);
        $template->setModuleTemplate('systemsinventory', 'Edit_Departments.html');
        return $template->get();
    }
    
    public static function departmentsList($data, $request){
        $rows = array();
        $no_department = 1;
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_department');
        $tbl->addField('display_name');
        $tbl->addField('parent_department');
        $tbl->addField('description');
        $tbl->addField('active');
        $tbl->addField('id');
        $tbl->addFieldConditional('id', '1', '!=');
        $tbl->addOrderBy('display_name');
        $pager = new \DatabasePager($db);
        $pager->setCallback(array('\systemsinventory\Controller\Settings','formatDepartmentList'));
        $pager->setId('department-list');
        $pager->setRowIdColumn('id');
        $pager->setHeaders(array('display_name'=>'Name','description'=>'Description','parent_department'=>'Parent Department','dept_active'=>'Is Active'));
        $data = $pager->getJson();
        return $data;
    }
    
    public static function userPermissionsList($data, $request){
        $users = Settings::getPHPWSUsers();
        $departments_result = SystemDevice::getSystemDepartments();
        // convert to associative array
        foreach($departments_result as $dept){
            $departments[$dept['id']] = $dept['display_name'];
        }
        $rows = array();
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_permission');
        $tbl->addField('user_id');
        $tbl->addField('departments');
        $tbl->addField('id');
        foreach($users as $user){
            $permissions = '';
            $permitted_dept = array();
            $db->clearConditional();
            $user_id = $user['id'];
            $tbl->addFieldConditional('user_id', $user_id, '=');
            $result = $db->select();
            if(!empty($result)){
                $permitted_dept = explode(':',$result['0']['departments']);
                foreach($permitted_dept as $dept){
                    if(!empty($permissions))
                        $permissions .= ', ';
                    $permissions .= $departments[$dept];
                }
            }else{
                $permissions = "All Departments!";
            }
            $action = '<a style="cursor:pointer" onclick="return confirm(\'Are you sure you want to delete this users permissions?\')" href="./systemsinventory/settings/editPermissions/?action=delete&user_id='.$user_id.'")>
                <span class="glyphicon glyphicon-trash" title="Delete Restrictions"></span></a>';
            $rows[] = array('display_name'=>$user['display_name'],'username'=>$user['username'],'permissions'=>$permissions,'action'=>$action);
        }
        $pager = new \Pager;
        $pager->setId('user-permission-list');
        $pager->setHeaders(array('display_name'=>'Name','username'=>'Username','permissions'=>'Current Permissions'));
        $pager->setRows($rows);
        $data = $pager->getJson();
        return $data;
    }
  
    public function saveLocation(\Request $request){
        $resource = new LocResource;
        $vars = $request->getRequestVars();
        $location_id = $vars['location_id'];
        
        if(isset($vars['description']))
            $resource->setDescription($vars['description']);
        $resource->setDisplayName($vars['display_name']);
        if(isset($vars['location_active']))
            $resource->setActive($vars['location_active']);
        if($location_id){
            $resource->setId($location_id);
        }
        $resource->save();
    }
    
    public function saveDepartment(\Request $request) {
        $resource = new DeptResource;
        $vars = $request->getRequestVars();
        $dept_id = $vars['department_id'];
        
        if(isset($vars['description']))
            $resource->setDescription($vars['description']);
        $resource->setDisplayName($vars['display_name']);
        if(isset($vars['parent_department']))
            $resource->setParentDepartment($vars['parent_department']);
        if(isset($vars['dept_active']))
            $resource->setActive($vars['dept_active']);
        if($dept_id){
            $resource->setId($dept_id);
        }
        $resource->save();
   }
    
  public function savePermissions(\Request $request){
      $vars = $request->getRequestVars();
      $users = $vars['users_multiselect'];
      $departments = implode(':',$vars['department_multiselect']);
      $db = \Database::getDB();
      $tbl = $db->addTable('systems_permission');
      $tbl->addField('user_id');
      $tbl->addField('id');
      foreach($users as $user){
          $db->clearConditional();
          $tbl->addFieldConditional('user_id', $user, '=');
          $result = $db->select();
          $resource = new Resource;
          $resource->setDepartments($departments);
          $resource->setUserID($user);
          if(!empty($result)){
              $id = $result['0']['id'];
              $resource->setId($id);
          }
          $resource->save();
      }   
      
  }
  
  public static function getLocationByID($location_id){
      $db = \Database::getDB();
      $tbl = $db->addTable('systems_location');
      $tbl->addField('id');
      $tbl->addField('display_name');
      $tbl->addField('description');
      $tbl->addField('active');
      $tbl->addFieldConditional('id', $location_id, '=');
      $result = $db->select();
      if(!empty($result))
          return $result[0];
      else 
          return FALSE;
  }
  
  public static function getDepartmentByID($dept_id){
      $db = \Database::getDB();
      $tbl = $db->addTable('systems_department');
      $tbl->addField('id');
      $tbl->addField('parent_department');
      $tbl->addField('display_name');
      $tbl->addField('description');
      $tbl->addField('active');
      $tbl->addFieldConditional('id', $dept_id, '=');
      $result = $db->select();
      if(!empty($result))
          return $result[0];
      else 
          return FALSE;
  }
  
  public static function deletePermissions($user_id){
          $db = \Database::getDB();
          $tbl = $db->addTable('systems_permission');
          $tbl->addFieldConditional('user_id', $user_id,'=');
          return $db->delete();
          
      }
  
  private static function getPHPWSUsers(){
      $db = \Database::getDB();
      $tbl = $db->addTable('users');
      $tbl->addField('id');
      $tbl->addField('username');
      $tbl->addField('display_name');
      $tbl->addFieldConditional('deity', 0, '=');
      $result = $db->select();
      if(!empty($result))
          return $result;
      else 
          return FALSE;
  }  

}
