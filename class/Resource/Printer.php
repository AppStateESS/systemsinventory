<?php
namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */

class Printer extends \Resource
{

  protected $device_id;
  protected $color;
  protected $network;
  protected $duplex;
  protected $toner_cartridge;
  protected $table = 'systems_printer';

    public function __construct()
    {
      parent::__construct();
      $this->device_id = new \Variable\Integer(0,'device_id');
      $this->toner_cartridge = new \Variable\TextOnly(NULL, 'toner_cartridge');
      $this->color = new \Variable\Bool(false,'color');
      $this->network = new \Variable\Bool(false,'network');
      $this->duplex = new \Variable\Bool(false,'duplex');
    }

    public function setDeviceID($device_id){
      $this->device_id->set($device_id);
    }

    public function setTonerCartridge($toner){
        $this->toner_cartridge->set($toner);
    }
    
    public function setColor($color){
        $this->color->set($color);
    }
    
    public function setNetwork($network){
        $this->network->set($network);
    }
    
    public function setDuplex($duplex){
        $this->duplex->set($duplex);
    }
}