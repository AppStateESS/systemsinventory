<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\SystemDevice as Resource;
/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard
 */
class SystemDevice extends \ResourceFactory
{

  public static function form(\Request $request, $active_tab, $command)
    {
      include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
      $vars = array();
      $req_vars = $request->getRequestVars();
      $vars['title'] = '';
      $system_id = NULL;
      if(!empty($req_vars['system_id']) && $command == 'edit'){
          $system_id = $req_vars['system_id'];
          $vars['title'] = "Edit ";
      }
      $vars = SystemDevice::initSystem($vars, $system_id);

      javascript('jquery');
      \Form::requiredScript();
      
      if (!in_array($active_tab, array('systems-pc', 'ipad', 'printer'))) {
	$active_tab = 'systems-pc';
      }
      
      $js_string = <<<EOF
	  <script type='text/javascript'>var active_tab = '$active_tab';</script> 
EOF;
      \Layout::addJSHeader($js_string);
      $script = PHPWS_SOURCE_HTTP . 'mod/systemsinventory/javascript/systems.js';
      \Layout::addJSHeader("<script type='text/javascript' src='$script'></script>");


      if($command == 'success'){
	$vars['message'] = "Device Saved!";
	$vars['display'] = 'display: block;';
      }else{
	$vars['message'] = '';
	$vars['display'] = 'display: none;';
      }
      
      $system_locations = SystemDevice::getSystemLocations();
      $location_options = '<option value="1">Select Location</opton>';
      foreach($system_locations as $key=>$val){
          $location_options .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
      }
      $vars['locations'] = $location_options;
      $system_dep = SystemDevice::getSystemDepartments();
      $dep_optons = '<option value="1">Select Department</opton>';
      foreach($system_dep as $val){
          $dep_optons .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
      }
      $vars['departments'] = $dep_optons;
      $command = 'add';
      
      $vars['form_action'] = "./systemsinventory/system/".$command;
      $template = new \Template($vars);
      $template->setModuleTemplate('systemsinventory', 'Add_System.html');
      return $template->get();
    }
    
    public static function editForm(\Request $request, $command)
    {
      include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
      $vars = array();
      $req_vars = $request->getRequestVars();
      $vars['title'] = 'Edit ';
      $system_id = NULL;
      if(!empty($req_vars['system_id'])){
          $system_id = $req_vars['system_id'];
      }else{
          throw new Exception("Invalid system id in system edit.");
      }
      
      $vars = SystemDevice::initSystem($vars, $system_id);

      if($command == 'success'){
	$vars['message'] = "Device Saved!";
	$vars['display'] = 'display: block;';
      }else{
	$vars['message'] = '';
	$vars['display'] = 'display: none;';
      }
      
      $system_locations = SystemDevice::getSystemLocations();
      $location_options = '<option value="1">Select Location</opton>';
      foreach($system_locations as $key=>$val){
          $location_options .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
      }
      $vars['locations'] = $location_options;
      $system_dep = SystemDevice::getSystemDepartments();
      $dep_optons = '<option value="1">Select Department</opton>';
      foreach($system_dep as $val){
          $dep_optons .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
      }
      $vars['departments'] = $dep_optons;
      $command = 'add';
      
      $vars['form_action'] = "./systemsinventory/system/".$command;
      $template = new \Template($vars);
      $template->setModuleTemplate('systemsinventory', 'Add_System.html');
      return $template->get();
    }

    public function postDevice(\Request $request){
      include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
      $system_device = new Resource;
      $device_type = PC;
      $vars = $request->getRequestVars();

      if(isset($vars['device_type'])){
	$device_type = $vars['device_type'];
      }

      if(isset($vars['server'])){
	$device_type = SERVER;
      }

      if(!empty($vars['device_id']))
          $system_device->setId ($vars['device_id']);
      $system_device->setDeviceType($device_type);
      $system_device->setPhysicalID(filter_input(INPUT_POST, 'physical_id'));
      $system_device->setName(filter_input(INPUT_POST, 'first_name', FILTER_SANITIZE_STRING), filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_STRING));
      $system_device->setUserName(filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING));
      $system_device->setPhone(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING));
      $system_device->setLocation(filter_input(INPUT_POST, 'location', FILTER_SANITIZE_NUMBER_INT));
      $system_device->setRoomNumber(filter_input(INPUT_POST, 'room_number', FILTER_SANITIZE_STRING));
      $system_device->setDepartment(filter_input(INPUT_POST, 'department', FILTER_SANITIZE_NUMBER_INT));
      $system_device->setModel(filter_input(INPUT_POST, 'model', FILTER_SANITIZE_STRING));
      $system_device->setHD(filter_input(INPUT_POST, 'hd', FILTER_SANITIZE_STRING));
      $system_device->setProcessor(filter_input(INPUT_POST, 'processor', FILTER_SANITIZE_STRING));
      $system_device->setRAM(filter_input(INPUT_POST, 'ram', FILTER_SANITIZE_STRING));
      $system_device->setMac(filter_input(INPUT_POST, 'mac', FILTER_SANITIZE_STRING));
      $system_device->setMac2(filter_input(INPUT_POST, 'mac2', FILTER_SANITIZE_STRING));
      $system_device->setPrimaryIP(filter_input(INPUT_POST, 'primary_ip', FILTER_SANITIZE_STRING));
      $system_device->setSecondaryIP(filter_input(INPUT_POST, 'secondary_ip', FILTER_SANITIZE_STRING));
      $system_device->setManufacturer(filter_input(INPUT_POST, 'manufacturer', FILTER_SANITIZE_STRING));
      $system_device->setVlan(filter_input(INPUT_POST, 'vlan', FILTER_SANITIZE_NUMBER_INT));
      $system_device->setPurchaseDate(filter_input(INPUT_POST, 'purchase_date', FILTER_SANITIZE_STRING));
      $system_device->setProfile(filter_input(INPUT_POST, 'profile', FILTER_SANITIZE_STRING));
      $system_device->setProfileName(filter_input(INPUT_POST, 'profile_name', FILTER_SANITIZE_STRING));
      $system_device->setSysPeriod(filter_input(INPUT_POST, 'sys_period', FILTER_SANITIZE_STRING));
      $system_device->setNotes(filter_input(INPUT_POST, 'system_notes', FILTER_SANITIZE_STRING));

      self::saveResource($system_device);
      return $system_device->getId();
    }
     
    public static function initSystem($vars, $system_id){
        
        return $vars;
    }
    
    public static function getSystemDetails($system_id){
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
        $device_details = array();
        if(empty($system_id)){
            throw new Exception("System ID invalid.");
        }
        // get the common device attributes
        $db = \Database::getDB();
        $query = "SELECT * FROM systems_device WHERE id='$system_id'";
        $pdo = $db->query($query);
        $result = $pdo->fetch(\PDO::FETCH_ASSOC);
        $device_type_id = $result['device_type_id'];
        $device_details = $result;
        // get the device specific attributes
        $table = SystemDevice::getSystemType($device_type_id);
        $device_table = $db->addTable($table);
        $device_table->addFieldConditional('device_id', $system_id);
        $device_result = $db->select();
        $device_result = $device_result['0'];
        // set the specific device id so we can use it to save the device specific info later.
        $specific_device_id = $device_result['id']; 
        unset($device_result['id']);
        $device_result['specific-device-id'] = $specific_device_id;
        
        //$device_attr = SystemDevice::getDeviceAttributes($device_type_id);
        $device_details = array_merge($device_details, $device_result);
        $device_details['device-type-id'] = $device_type_id;
        $purchase_date = $device_details['purchase_date'];
        $device_details["purchase_date"] = date('Y-m-d', $purchase_date);
        $system_locations = SystemDevice::getSystemLocations();
        $location_options = '<option value="1">Select Location</opton>';
        foreach($system_locations as $key=>$val){
            $location_options .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
        }
        $device_details['locations'] = $location_options;
        $system_dep = SystemDevice::getSystemDepartments();
        $dep_optons = '<option value="1">Select Department</opton>';
        foreach($system_dep as $val){
            $dep_optons .= '<option value="'.$val['id'].'">'.$val['description'].'</option>';
        }
        $device_details['departments'] = $dep_optons;
        $device_details['testarray'] = array("test1"=>"test1","test2"=>"test2","test3"=>"test3");
                
        return $device_details;
    }
    
    public static function getDeviceAttributes($type_id){
        $systems_pc = array("device_id" => NULL, "os" => "OS","primary_monitor" => "Primary Monitor","secondary_monitor" => "Secondary Monitor","video_card" => "Video Card","server_type" => NULL,"battery_backup" => NULL,"redundant_backup" => NULL,"touch_screen" => "Touch Screen","smart_room" => "Smart Room", "dual_monitor" => "Dual Monitor","system_usage" => NULL,"rotation" => "Rotation","stand" => "Stand","check_in" => "Check In");
        $systems_server = array("device_id" => NULL, "os" => "OS","primary_monitor" => "Primary Monitor","secondary_monitor" => "Secondary Monitor","video_card" => "Video Card","server_type" => NULL,"battery_backup" => NULL,"redundant_backup" => NULL,"touch_screen" => "Touch Screen","smart_room" => "Smart Room", "dual_monitor" => "Dual Monitor","system_usage" => NULL,"rotation" => "Rotation","stand" => "Stand","check_in" => "Check In");
        $systems_ipad = array("device_id" => NULL, "generation" => "Generation", "apple_id" => "Apple ID");
        $systems_printer = array("device_id" => NULL, "toner_cartridge" => "Toner Cartridge", "color" => "Color", "network" => "Network", "duplex" => "Duplex");

        switch($type_id){
            case '1':
                $attr = $systems_pc;
                break;
            case '2':
                $attr = $systems_server;
                break;
            case '3':
                $attr = $systems_ipad;
                break;
            case '4':
                $attr = $systems_printer;
                break;
            case '5':
                $attr = $systems_camera;
                break;
            case '6':
                $attr = $digital_sign;
                break;
            case '7':
                $attr = $systems_timeclock;
                break;
            default:
                $attr = $systems_pc;
        }
        return $attr;
    }
    
    public static function getSystemType($type_id){
        switch($type_id){
            case '1':
            case '2':
                $table = 'systems_pc';
                break;
            case '3':
                $table = 'systems_ipad';
                break;
            case '4':
                $table = 'systems_printer';
                break;
            case '5':
                $table = 'systems_camera';
                break;
            case '6':
                $table = 'systems_digital_sign';
                break;
            case '7':
                $table = 'systems_timeclock';
                break;
            default:
                $table = 'systems_pc';
        }
        return $table;
    }
    
     public static function getLocationByID($location_id){
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_location');
        $tbl->addField('description');
        $tbl->addFieldConditional('id', $location_id, '=');
        $result = $db->select();
        if(empty($result))
            return 0; //should be exception
        return $result[0]['description'];
  }
  
  public static function getDepartmentByID($department_id){
      $db = \Database::getDB();
      $tbl = $db->addTable('systems_department');
      $tbl->addField('description');
      $tbl->addFieldConditional('id', $department_id, '=');
      $result = $db->select();
      if(empty($result))
          return 'Not Found'; //should be exception
      
      return $result[0]['description'];
  }
  
    public static function getSystemLocations(){
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_location');
        $tbl->addField('id');
        $tbl->addField('description');
        $result = $db->select();
        if(empty($result))
            return 0; //should be exception
        return $result;
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

  public static function display()
    {
      
      //$contact_info = self::load();
      //$values = self::getValues($contact_info);

        $template = new \Template($values);
        $template->setModuleTemplate('systemsinventory', 'view.html');
        $content = $template->get();
        return $content;
      
    }

}
