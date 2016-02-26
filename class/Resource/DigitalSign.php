<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class DigitalSign extends \Resource
{

  protected $device_id;
  protected $screen_size;
  protected $designer;
  protected $hi_def;
  protected $table = 'systems_digital_sign';

    public function __construct()
    {
      parent::__construct();
      $this->device_id = new \Variable\Integer(0,'device_id');
      $this->screen_size = new \Variable\TextOnly(null,'screen_size');
      $this->screen_size->allowNull(true);
      $this->designer = new \Variable\TextOnly(null,'designer');
      $this->designer->allowNull(true);
      $this->hi_def = new \Variable\Bool(false,'hi_def');
    }

    public function setDeviceID($device_id){
      $this->device_id->set($device_id);
    }

    public function setScreenSize($screen_size){
      $this->screen_size->set($screen_size);
    }

    public function setDesigner($designer){
      $this->designer->set($designer);
    }

    public function setHiDef($hd){
      $this->hi_def->set($hd);
    }

}

