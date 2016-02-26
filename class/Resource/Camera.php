<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class Camera extends \Resource
{

  protected $device_id;
  protected $sd_support;
  protected $megapixels;
  protected $hi_def;
  protected $exterior;
  protected $covert;
  protected $is_on;
  protected $table = 'systems_camera';

    public function __construct()
    {
      parent::__construct();
      $this->device_id = new \Variable\Integer(0,'device_id');
      $this->megapixels = new \Variable\TextOnly(null,'megapixels');
      $this->megapixels->allowNull(true);
      $this->sd_support = new \Variable\Bool(false,'sd_support');
      $this->hi_def = new \Variable\Bool(false,'hi_def');
      $this->exterior = new \Variable\Bool(false,'exterior');
      $this->covert = new \Variable\Bool(false,'covert');
      $this->is_on = new \Variable\Bool(false,'is_on');
    }

    public function setDeviceID($device_id){
      $this->device_id->set($device_id);
    }

    public function setMegapixels($megapixels){
      $this->megapixels->set($megapixels);
    }

    public function setSDSupport($sd){
      $this->sd_support->set($sd);
    }

    public function setHiDef($hd){
      $this->hi_def->set($hd);
    }

    public function setExterior($exterior){
      $this->exterior->set($exterior);
    }

    public function setCovert($covert){
      $this->covert->set($covert);
    }

    public function setOn($on){
      $this->is_on->set($on);
    }

}

