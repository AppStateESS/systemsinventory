<?php
namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class IPAD extends \Resource
{

  protected $device_id;
  protected $generation;
  protected $apple_id;
  protected $protective_case;
  protected $table = 'systems_ipad';

    public function __construct()
    {
      parent::__construct();
      $this->device_id = new \Variable\Integer(0,'device_id');
      $this->generation = new \Variable\TextOnly(null, 'generation');
      $this->generation->allowNull(true);
      $this->apple_id = new \Variable\TextOnly(null, 'apple_id');
      $this->apple_id->allowNull(true);
      $this->protective_case = new \Variable\Bool(false,'case');
    }

    public function setDeviceID($device_id){
      $this->device_id->set($device_id);
    }

    public function setGeneration($generation){
        $this->generation->set($generation);
    }
    
    public function setAppleID($apple_id){
        $this->apple_id->set($apple_id);
    }
    
    public function setCase($case){
        $this->protective_case->set($case);
    }
}