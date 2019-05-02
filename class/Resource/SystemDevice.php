<?php

namespace systemsinventory\Resource;

require_once PHPWS_SOURCE_DIR . 'mod/systemsinventory/config/device_types.php';

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class SystemDevice extends \phpws2\Resource
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
    protected $vlan;
    protected $first_name;
    protected $last_name;
    protected $username;
    protected $phone;
    protected $purchase_date;
    protected $profile;
    protected $profile_name;
    protected $rotation;
    protected $sys_period = null;

    /**
     * 0 Not assigned
     * 1 Assigned to staff
     * 2 Assigned to location
     * 3 Surplus
     * 4 Lost/Stolen
     * @var \phpws2\Variable\SmallInteger
     */
    protected $status;
    protected $notes;
    protected $table = 'systems_device';

    public function __construct()
    {
        parent::__construct();
        $this->location_id = new \phpws2\Variable\IntegerVar(null, 'location');
        $this->location_id->allowNull(true);
        $this->room_number = new \phpws2\Variable\TextOnly(null, 'room_number');
        $this->room_number->allowNull(true);
        $this->department_id = new \phpws2\Variable\IntegerVar(null, 'department');
        $this->department_id->allowNull(true);
        $this->physical_id = new \phpws2\Variable\TextOnly(null, 'physical_id');
        $this->physical_id->allowNull(true);
        $this->device_type_id = new \phpws2\Variable\IntegerVar(0, 'device_type');
        $this->model = new \phpws2\Variable\TextOnly(null, 'model');
        $this->model->allowNull(true);
        $this->hd_size = new \phpws2\Variable\TextOnly(null, 'hd_size');
        $this->hd_size->allowNull(true);
        $this->processor = new \phpws2\Variable\TextOnly(null, 'processor');
        $this->processor->allowNull(true);
        $this->ram = new \phpws2\Variable\TextOnly(null, 'ram');
        $this->ram->allowNull(true);
        $this->mac = new \phpws2\Variable\TextOnly(null, 'mac');
        $this->mac->allowNull(true);
        $this->mac2 = new \phpws2\Variable\TextOnly(null, 'mac2');
        $this->mac2->allowNull(true);
        $this->primary_ip = new \phpws2\Variable\TextOnly(null, 'primary_ip');
        $this->primary_ip->allowNull(true);
        $this->secondary_ip = new \phpws2\Variable\TextOnly(null, 'secondary_ip');
        $this->secondary_ip->allowNull(true);
        $this->manufacturer = new \phpws2\Variable\TextOnly(null, 'manufacturer');
        $this->manufacturer->allowNull(true);
        $this->vlan = new \phpws2\Variable\IntegerVar(0, 'vlan');
        $this->vlan->allowNull(true);
        $this->first_name = new \phpws2\Variable\TextOnly(null, 'first_name');
        $this->first_name->allowNull(true);
        $this->last_name = new \phpws2\Variable\TextOnly(null, 'last_name');
        $this->last_name->allowNull(true);
        $this->username = new \phpws2\Variable\TextOnly(null, 'username');
        $this->username->allowNull(true);
        $this->phone = new \phpws2\Variable\PhoneNumber(null, 'phone');
        $this->phone->allowNull(true);
        $this->purchase_date = new \phpws2\Variable\IntegerVar(null, 'purchase_date');
        $this->purchase_date->allowNull(true);
        $this->profile = new \phpws2\Variable\BooleanVar(false, 'profile');
        $this->profile_name = new \phpws2\Variable\TextOnly(null, 'profile_name');
        $this->profile_name->allowNull(true);
        $this->notes = new \phpws2\Variable\TextOnly(null, 'notes');
        $this->notes->allowNull(true);
        $this->status = new \phpws2\Variable\SmallInteger(0, 'status');
        $this->rotation = new \phpws2\Variable\BooleanVar(false, 'rotation');
    }

    public function setName($first_name, $last_name)
    {
        $this->first_name->set($first_name);
        $this->last_name->set($last_name);
    }

    public function setPhysicalID($physical_id)
    {
        $this->physical_id->set($physical_id);
    }

    public function setUserName($username)
    {
        $this->username->set($username);
    }

    public function setPhone($phone)
    {
        $this->phone->set($phone);
    }

    public function setLocation($location_id)
    {
        $this->location_id->set($location_id);
    }

    public function setRoomNumber($room_number)
    {
        $this->room_number->set($room_number);
    }

    public function setDepartment($department_id)
    {
        $this->department_id->set($department_id);
    }

    public function getDeviceType()
    {
        return $this->device_type_id->get();
    }

    public function getStatus()
    {
        return $this->status->get();
    }

    public function setDeviceType($device_type_id)
    {
        $this->device_type_id->set($device_type_id);
    }

    public function setModel($model)
    {
        $this->model->set($model);
    }

    public function setHdSize($hd_size)
    {
        $this->hd_size->set($hd_size);
    }

    public function setProcessor($processor)
    {
        $this->processor->set($processor);
    }

    public function setRAM($ram)
    {
        $this->ram->set($ram);
    }

    public function setMac($mac)
    {
        $this->mac->set($mac);
    }

    public function setMac2($mac2)
    {
        $this->mac2->set($mac2);
    }

    public function setPrimaryIP($ip)
    {
        $this->primary_ip->set($ip);
    }

    public function setSecondaryIP($ip)
    {
        $this->secondary_ip->set($ip);
    }

    public function setManufacturer($manufacturer)
    {
        $this->manufacturer->set($manufacturer);
    }

    public function setVlan($vlan)
    {
        $this->vlan->set($vlan);
    }

    public function setPurchaseDate($purchase_date, $format_string=false)
    {
        if (!empty($purchase_date)) {
            if($format_string){
                $this->purchase_date->set(strtotime($purchase_date));
            }else{
                $this->purchase_date->set($purchase_date);
            }
        }
    }
    
    public function getPurchaseDate(){
        return $this->purchase_date->get();
    }

    public function setProfile($profile)
    {
        if (empty($profile))
            $profile = false;
        $this->profile->set($profile);
    }

    public function setProfileName($profile_name)
    {
        $this->profile_name->set($profile_name);
    }

    public function setSysPeriod($sys_period)
    {
        //      $this->sys_period->set($sys_period);
    }

    public function setNotes($notes)
    {
        $this->notes->set($notes);
    }

    public function setFirstName($name)
    {
        $this->first_name->set($name);
    }

    public function setLastName($name)
    {
        $this->last_name->set($name);
    }

    public function setRotation($rotation)
    {
        $this->rotation->set($rotation);
    }

    public function setStatus($status)
    {
        $this->status->set($status);
    }

    public function getProfileName()
    {
        return $this->profile_name->get();
    }

    public function isPC()
    {
        return $this->device_type_id->get() === PC;
    }
    
    public function isServer()
    {
        return $this->device_type_id->get() === SERVER;
    }

    public function isLaptop()
    {
        return $this->device_type_id->get() === LAPTOP; 
    }

    public function isPrinter()
    {
        return $this->device_type_id->get() === PRINTER;
    }

    public function isClock()
    {
        return $this->device_type_id->get() === TIME_CLOCK;
    }

    public function isIpad()
    {
        return $this->device_type_id->get() === IPAD;
    }
    
    public function isCamera()
    {
        return $this->device_type_id->get() === CAMERA;
    }

    public function isSign()
    {
        return $this->device_type_id->get() === DIGITAL_SIGN;
    }

}
