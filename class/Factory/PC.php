<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\PC as Resource;

class PC extends SystemDevice
{

    public function postNewPC(\Canopy\Request $request, Resource $pc)
    {
        $pc->setPrimaryMonitor($request->pullPostString('primary_monitor'));
        $pc->setVideoCard(filter_input(INPUT_POST, 'video_card',
                        FILTER_SANITIZE_STRING));
        $pc->setOS(filter_input(INPUT_POST, 'os', FILTER_SANITIZE_STRING));

        $pc->setServerType(filter_input(INPUT_POST, 'server_type',
                        FILTER_SANITIZE_STRING));
        $pc->setBatteryBackup((bool)$request->pullPostBoolean('battery_backup', true));
        $pc->setRedundantBackup((bool)$request->pullPostBoolean('redundant_backup', true));
        $pc->setStand((bool)$request->pullPostBoolean('stand', true));
        $pc->setTouchScreen((bool)$request->pullPostBoolean('touch_screen', true));
        $pc->setIsServer((bool)$request->pullPostBoolean('is_server', true));
        $pc->setDual((bool)$request->pullPostBoolean('dual_monitor', true));
        $pc->setSecondaryMonitor($request->pullPostString('secondary_monitor', true));
        self::saveResource($pc);
    }

    public static function assignDevice(Resource $sdevice, $device, $request)
    {
        // if the status is 2, device is assigned to a LOCATION and we can
        // forgive missing names
        
        $device->setFirstName($request->pullPatchString('first_name'), $device->getStatus() == 2);
        $device->setLastName($request->pullPatchString('last_name', $device->getStatus() == 2));
        $device->setUsername($request->pullPatchString('username', $device->getStatus() == 2));
        $device->setPhone($request->pullPatchString('phone', $device->getStatus() == 2));
        $device->setVlan($request->pullPatchInteger('vlan', true));
        if ($request->patchVarIsset('secondary_ip')) {
            $device->setSecondaryIP($request->pullPatchString('secondary_ip',
                            true));
        }
        $sdevice->setSystemUsage($request->pullPatchInteger('system_usage'));
        $sdevice->setSmartRoom((bool)$request->pullPatchBoolean('smart_room', true));
        $sdevice->setCheckIn((bool)$request->pullPatchBoolean('check_in', true));

    }

}
