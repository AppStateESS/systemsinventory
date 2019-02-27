<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class DigitalSign extends \phpws2\Resource
{

  protected $device_id;
  protected $screen_size;
  protected $screen_manufacturer;
  protected $hi_def;
  protected $content_creator;
  protected $table = 'systems_digital_sign';

    public function __construct()
    {
      parent::__construct();
      $this->device_id = new \phpws2\Variable\IntegerVar(0,'device_id');
      $this->screen_size = new \phpws2\Variable\TextOnly(null,'screen_size');
      $this->screen_size->allowNull(true);
      $this->screen_manufacturer = new \phpws2\Variable\TextOnly(null,'screen_manufacturer');
      $this->screen_manufacturer->allowNull(true);
      $this->content_creator = new \phpws2\Variable\TextOnly(null,'content_creator');
      $this->content_creator->allowNull(true);
      $this->hi_def = new \phpws2\Variable\BooleanVar(false,'hi_def');
      $this->hi_def->allowNull(true);
    }

    public function setDeviceID($device_id){
      $this->device_id->set($device_id);
    }

    public function setScreenSize($screen_size){
      $this->screen_size->set($screen_size);
    }

    public function setScreenManufacturer($screen_man){
      $this->screen_manufacturer->set($screen_man);
    }

    public function setHiDef($hd){
      $this->hi_def->set($hd);
    }

    public function setContentCreator($creator){
        $this->content_creator = $creator;
    }
}

