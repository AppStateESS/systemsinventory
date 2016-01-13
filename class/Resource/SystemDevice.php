<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class SystemDevice extends \Resource
{
  protected $location_id;
  protected $room_number;
  protected $department_id;
  protected $physical_id;
  protected $device_type_id;
  protected $model;
  protected $hd_size;
  protected $processor;
  protected $ram;
  protected $mac;
  protected $mac2;
  protected $primary_ip;
  protected $secondary_ip;
  protected $manufacturer;
  protected $first_name;
  protected $last_name;
  protected $username;
  protected $phone;
  protected $purchase_date;
  protected $profile;
  protected $profile_name;
  protected $sys_period = null;
  protected $notes;

  protected $table = 'systems_device';

    public function __construct()
    {
      parent::__construct();
      $this->location_id = new \Variable\Integer(0, 'location');
      $this->room_number = new \Variable\TextOnly(null, 'room_number');
      $this->department_id = new \Variable\Integer(0, 'department');
      $this->physical_id = new \Variable\TextOnly(null,'physical_id');
      $this->device_type_id = new \Variable\Integer(0, 'device_type');
      $this->model = new \Variable\TextOnly(null, 'model');
      $this->hd_size = new \Variable\TextOnly(null, 'hd_size');
      $this->hd_size->allowNull(true);
      $this->processor = new \Variable\TextOnly(null, 'processor');
      $this->processor->allowNull(true);
      $this->ram = new \Variable\TextOnly(null, 'ram');
      $this->ram->allowNull(true);
      $this->mac = new \Variable\TextOnly(null, 'mac');
      $this->mac->allowNull(true);
      $this->mac2 = new \Variable\TextOnly(null,'mac2');
      $this->mac2->allowNull(true);
      $this->primary_ip = new \Variable\TextOnly(null, 'primary_ip');
      $this->primary_ip->allowNull(true);
      $this->secondary_ip = new \Variable\TextOnly(null, 'secondary_ip');
      $this->secondary_ip->allowNull(true);
      $this->manufacturer = new \Variable\TextOnly(null, 'manufacturer');
      $this->manufacturer->allowNull(true);
      $this->first_name = new \Variable\TextOnly(null, 'first_name');
      $this->first_name->allowNull(true);
      $this->last_name = new \Variable\TextOnly(null, 'last_name');
      $this->last_name->allowNull(true);
      $this->username = new \Variable\TextOnly(null, 'username');
      $this->username->allowNull(true);
      $this->phone = new \Variable\PhoneNumber(null, 'phone');
      $this->phone->allowNull(true);
      $this->purchase_date = new \Variable\Date(null, 'purchase_date');
      $this->purchase_date->allowNull(true);
      $this->profile = new \Variable\Bool(false, 'profile');
      $this->profile_name = new \Variable\TextOnly(null, 'profile_name');
      $this->profile_name->allowNull(true);
      $this->notes = new \Variable\TextOnly(null, 'notes');
      $this->notes->allowNull(true);
      
    }

    public function setName($first_name, $last_name){
      $this->first_name->set($first_name);
      $this->last_name->set($last_name);
    }

    public function setPhysicalID($physical_id){
      $this->physical_id->set($physical_id);
    }

    public function setUserName($username){
      $this->username->set($username);
    }

    public function setPhone($phone){
      $this->phone->set($phone);
    }

    public function setLocation($location_id){
      $this->location_id->set($location_id);
    }

    public function setRoomNumber($room_number){
      $this->room_number->set($room_number);
    }
    
    public function setDepartment($department_id){
      $this->department_id->set($department_id);
    }

    public function setDeviceType($device_type_id){
      $this->device_type_id->set($device_type_id);
    }

    public function setModel($model){
      $this->model->set($model);
    }

    public function setHD($hd_size){
      $this->hd_size->set($hd_size);
    }
   
    public function setProcessor($processor){
      $this->processor->set($processor);
    }

    public function setRAM($ram){
      $this->ram->set($ram);
    }

    public function setMac($mac){
      $this->mac->set($mac);
    }

    public function setMac2($mac2){
      $this->mac2->set($mac2);
    }

    public function setPrimaryIP($ip){
      $this->primary_ip->set($ip);
    }

    public function setSecondaryIP($ip){
      $this->secondary_ip->set($ip);
    }

    public function setManufacturer($manufacturer){
      $this->manufacturer->set($manufacturer);
    }

    public function setPurchaseDate($purchase_date){
      $this->purchase_date->set(strtotime($purchase_date));
    }

    public function setProfile($profile){
      if(empty($profile))
	$profile = false;
      $this->profile->set($profile);
    }

    public function setProfileName($profile_name){
      $this->profile_name->set($profile_name);
    }

    public function setSysPeriod($sys_period){
      //      $this->sys_period->set($sys_period);
    }

    public function setNotes($notes){
      $this->notes->set($notes);
    }

}