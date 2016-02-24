<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\IPAD as Resource;

class IPAD extends SystemDevice
{

  public function postNewIPAD(\Request $request, $device_id){
    $ipad = new Resource;
    $vars = $request->getRequestVars();
    $ipad->setDeviceID($device_id);
    $ipad->setGeneration(filter_input(INPUT_POST, 'generation', FILTER_SANITIZE_STRING));
    $ipad->setAppleID(filter_input(INPUT_POST, 'apple_id', FILTER_SANITIZE_STRING));

    self::saveResource($ipad);

  }
}
