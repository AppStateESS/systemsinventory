<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\Printer as Resource;

class Printer extends SystemDevice
{

  public function postNewPrinter(\Request $request, $device_id){
    $printer = new Resource;
    $vars = $request->getRequestVars();
    
    if(!empty($vars['specific_device_id']))
        $printer->setId ($vars['specific_device_id']);
    $printer->setDeviceID($device_id);
    $printer->setTonerCartridge(filter_input(INPUT_POST, 'toner_cartridge', FILTER_SANITIZE_STRING));
    if(isset($vars['color']))
      $printer->setColor(true);
    if(isset($vars['network']))
      $printer->setNetwork(true);
    if(isset($vars['duplex']))
      $printer->setDuplex(true);

    self::saveResource($printer);

  }
}
