<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\PC as Resource;

class PC extends SystemDevice
{

    public function postNewPC(\Canopy\Request $request, Resource $pc)
    {
        $pc->setPrimaryMonitor(filter_input(INPUT_POST, 'primary_monitor',
                        FILTER_SANITIZE_STRING));
        $pc->setSecondaryMonitor(filter_input(INPUT_POST, 'secondary_monitor',
                        FILTER_SANITIZE_STRING));
        $pc->setVideoCard(filter_input(INPUT_POST, 'video_card',
                        FILTER_SANITIZE_STRING));
        $pc->setOS(filter_input(INPUT_POST, 'os', FILTER_SANITIZE_STRING));

        $pc->setServerType(filter_input(INPUT_POST, 'server_type',
                        FILTER_SANITIZE_STRING));
        $pc->setBatteryBackup($request->pullPostBoolean('battery_backup'));
        $pc->setRedundantBackup($request->pullPostBoolean('redundant_backup'));
        $pc->setRotation($request->pullPostBoolean('rotation'));
        $pc->setStand($request->pullPostBoolean('stand'));
        $pc->setTouchScreen($request->pullPostBoolean('touch_screen'));
        $pc->setDual($request->pullPostBoolean('dual_monitor'));
        $pc->setSmartRoom($request->pullPostBoolean('smart_room'));
        $pc->setCheckIn($request->pullPostBoolean('check_in'));
        $pc->setIsServer($request->pullPostBoolean('is_server'));

        self::saveResource($pc);
    }

    public static function assignDevice(Resource $device, $request)
    {
        // if the status is 2, device is assigned to a LOCATION and we can 
        // forgive missing names
        $device->setFirstName($request->pullPatchString('first_name'), $device->getStatus() == 2);
        $device->setLastName($request->pullPatchString('last_name', $device->getStatus() == 2));
        $device->setUsername($request->pullPatchString('username', $device->getStatus() == 2));
        $device->setPhone($request->pullPatchString('phone', $device->getStatus() == 2));
        $device->setSysPeriod($request->pullPatchString('system_usage'));
        $device->setVlan($request->pullPatchInteger('vlan', true));
        if ($request->patchVarIsset('secondary_ip')) {
            $device->setSecondaryIP($request->pullPatchString('secondary_ip',
                            true));
        }
    }

}
