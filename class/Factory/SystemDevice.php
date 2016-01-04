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

      $command = 'add';
      
      $vars['form_action'] = "./systemsinventory/system/".$command;
      $template = new \Template($vars);
      $template->setModuleTemplate('systemsinventory', 'Add_System.html');
      return $template->get();
    }

    public function postDevice(\Request $request){
      include(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
      $system_device = new Resource;
      $device_type = PC;
      $vars = $request->getRequestVars();

      if(isset($vars['device_type'])){
	$device_type = $vars['device_type'];
      }

      if(isset($vars['server'])){
	$device_type = SERVER;
      }

      $system_device->setDeviceType($device_type);
      $system_device->setPhysicalID(filter_input(INPUT_POST, 'physical_id'));
      $system_device->setName(filter_input(INPUT_POST, 'first_name', FILTER_SANITIZE_STRING), filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_STRING));
      $system_device->setUserName(filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING));
      $system_device->setPhone(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING));
      $system_device->setLocation(filter_input(INPUT_POST, 'location', FILTER_SANITIZE_NUMBER_INT));
      $system_device->setRoomNumber(filter_input(INPUT_POST, 'room_number', FILTER_SANITIZE_STRING));
      $system_device->setDepartment(filter_input(INPUT_POST, 'department', FILTER_SANITIZE_NUMBER_INT));
      $system_device->setModel(filter_input(INPUT_POST, 'model', FILTER_SANITIZE_STRING));
      $system_device->setHD(filter_input(INPUT_POST, 'hd_size', FILTER_SANITIZE_STRING));
      $system_device->setProcessor(filter_input(INPUT_POST, 'processor', FILTER_SANITIZE_STRING));
      $system_device->setRAM(filter_input(INPUT_POST, 'ram', FILTER_SANITIZE_STRING));
      $system_device->setMac(filter_input(INPUT_POST, 'mac', FILTER_SANITIZE_STRING));
      $system_device->setPrimaryIP(filter_input(INPUT_POST, 'primary_ip', FILTER_SANITIZE_STRING));
      $system_device->setSecondaryIP(filter_input(INPUT_POST, 'secondary_ip', FILTER_SANITIZE_STRING));
      $system_device->setManufacturer(filter_input(INPUT_POST, 'manufacturer', FILTER_SANITIZE_STRING));
      $system_device->setPurchaseDate(filter_input(INPUT_POST, 'purchase_date', FILTER_SANITIZE_STRING));
      $system_device->setProfile(filter_input(INPUT_POST, 'profile', FILTER_SANITIZE_STRING));
      $system_device->setProfileName(filter_input(INPUT_POST, 'profile_name', FILTER_SANITIZE_STRING));
      $system_device->setSysPeriod(filter_input(INPUT_POST, 'sys_period', FILTER_SANITIZE_STRING));
      $system_device->setNotes(filter_input(INPUT_POST, 'system_notes', FILTER_SANITIZE_STRING));

      self::saveResource($system_device);
      return $system_device->getId();
    }
     
    /**
    public static function load()
    {
      
      $system_device = new \systemsinventory\Resource\SystemDevice;

      //	$contact_info->setPhoneNumber(\Settings::get('systemsinventory', 'phone_number'));
      //	$contact_info->setFaxNumber(\Settings::get('systemsinventory', 'fax_number'));
      //        $contact_info->setEmail(\Settings::get('systemsinventory', 'email'));

      //	$contact_info->setPhysicalAddress(ContactInfo\PhysicalAddress::load());
      //  $contact_info->setMap(Factory\ContactInfo\Map::load());
      //  $contact_info->setSocial(Factory\ContactInfo\Social::load());

        return $system_device;
    }
    */    

    private static function getValues(\systemsinventory\Resource\SystemDevice $contact_info)
    {
        $values['phone_number'] = $contact_info->getPhoneNumber();
        $values['fax_number'] = $contact_info->getFaxNumber();
        $values['email'] = $contact_info->getEmail();
        $values['formatted_phone_number'] = $contact_info->getPhoneNumber(true);
        $values['formatted_fax_number'] = $contact_info->getFaxNumber(true);

        $physical_address = $contact_info->getPhysicalAddress();
        $map = $contact_info->getMap();
        $social = $contact_info->getSocial();

        $values = array_merge($values, ContactInfo\PhysicalAddress::getValues($physical_address));
        $values = array_merge($values, ContactInfo\Map::getValues($map));
        $values = array_merge($values, ContactInfo\Social::getValues($social));

        return $values;
    }

    /**
    public static function post(\contact\Resource\SystemDevice $system_device, $values)
    {
        $system_device->setPhoneNumber($values['phone_number']);
        $system_device->setFaxNumber($values['fax_number']);
        $system_device->setEmail($values['email']);
        self::save($system_device);

        $physical_address = $system_device->getPhysicalAddress();
        Factory\ContactInfo\PhysicalAddress::set($physical_address, $values);
        Factory\ContactInfo\PhysicalAddress::save($physical_address);
    }

    private static function save(\contact\Resource\SystemDevice $system_device)
    {
        \Settings::set('contact', 'phone_number', $system_device->getPhoneNumber());
        \Settings::set('contact', 'fax_number', $system_device->getFaxNumber());
        \Settings::set('contact', 'email', $system_device->getEmail());
    }
    */
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
