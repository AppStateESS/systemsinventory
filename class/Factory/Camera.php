<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\Camera as Resource;

class Camera extends SystemDevice
{

  public function postNewCamera(\Request $request, $device_id){
    $camera = new Resource;
    $vars = $request->getRequestVars();
    
    if(isset($vars['specific_device_id']))
        $camera->setId ($vars['specific_device_id']);
    $camera->setDeviceID($device_id);
    $camera->setMegapixels(filter_input(INPUT_POST, 'megapixels', FILTER_SANITIZE_STRING));
    if(isset($vars['sd_support']))
      $camera->setSDSupport(true);
    if(isset($vars['hi_def']))
      $camera->setHiDef(true);
    if(isset($vars['exterior']))
      $camera->setExterior(true);
    if(isset($vars['covert']))
      $camera->setCovert(true);
    if(isset($vars['is_on']))
      $camera->setOn(true);

    self::saveResource($camera);

  }
}