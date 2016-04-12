<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\PC as Resource;

class PC extends SystemDevice
{

  public function postNewPC(\Request $request, $device_id){
    $pc = new Resource;
    $vars = $request->getRequestVars();
    
    if(!empty($vars['specific_device_id']))
        $pc->setId ($vars['specific_device_id']);
    $pc->setDeviceID($device_id);
    $pc->setPrimaryMonitor(filter_input(INPUT_POST, 'primary_monitor', FILTER_SANITIZE_STRING));
    $pc->setSecondaryMonitor(filter_input(INPUT_POST, 'secondary_monitor', FILTER_SANITIZE_STRING));
    $pc->setVideoCard(filter_input(INPUT_POST, 'video_card', FILTER_SANITIZE_STRING));
    $pc->setOS(filter_input(INPUT_POST, 'os', FILTER_SANITIZE_STRING));
    $pc->setSystemUsage(filter_input(INPUT_POST, 'system_usage', FILTER_SANITIZE_STRING));
    $pc->setServerType(filter_input(INPUT_POST, 'server_type', FILTER_SANITIZE_STRING));
    if(isset($vars['battery_bk']))
      $pc->setBatteryBackup(true);
    if(isset($vars['redundant_bk']))
      $pc->setRedundantBackup(true);
    if(isset($vars['rotation']))
      $pc->setRotation(true);
    if(isset($vars['stand']))
      $pc->setStand(true);
    if(isset($vars['touch_screen']))
      $pc->setTouchScreen(true);
    if(isset($vars['dual_monitor']))
      $pc->setDual(true);
    if(isset($vars['smart_room']))
      $pc->setSmartRoom(true);
    if(isset($vars['checkin']))
      $pc->setCheckIn(true);

    self::saveResource($pc);

  }
}