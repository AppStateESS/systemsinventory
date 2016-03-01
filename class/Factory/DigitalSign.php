<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\DigitalSign as Resource;

class DigitalSign extends SystemDevice
{

  public function postNewDigitalSign(\Request $request, $device_id){
    $digital_sign = new Resource;
    $vars = $request->getRequestVars();
    
    if(isset($vars['specific_device_id']))
        $digital_sign->setId ($vars['specific_device_id']);
    $digital_sign->setDeviceID($device_id);
    $digital_sign->setScreenSize(filter_input(INPUT_POST, 'screen_size', FILTER_SANITIZE_STRING));
    $digital_sign->setScreenManufacturer(filter_input(INPUT_POST, 'screen_manufacturer', FILTER_SANITIZE_STRING));
    if(isset($vars['hi_def']))
      $digital_sign->setHiDef(true);

    self::saveResource($digital_sign);

  }
}