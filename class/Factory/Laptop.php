<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\Laptop as Resource;

class Laptop extends SystemDevice
{

    public function postNewLaptop(\Canopy\Request $request, Resource $laptop)
    {
        $laptop->setPrimaryMonitor($request->pullPostString('primary_monitor'));
        $laptop->setVideoCard(filter_input(INPUT_POST, 'video_card',
                        FILTER_SANITIZE_STRING));
        $laptop->setOS(filter_input(INPUT_POST, 'os', FILTER_SANITIZE_STRING));

        $laptop->setServerType(filter_input(INPUT_POST, 'server_type',
                        FILTER_SANITIZE_STRING));
        $laptop->setBatteryBackup((bool)$request->pullPostBoolean('battery_backup', true));
        $laptop->setRedundantBackup((bool)$request->pullPostBoolean('redundant_backup', true));
        $laptop->setRotation((bool)$request->pullPostBoolean('rotation', true));
        $laptop->setStand((bool)$request->pullPostBoolean('stand', true));
        $laptop->setTouchScreen((bool)$request->pullPostBoolean('touch_screen', true));
        $laptop->setIsServer((bool)$request->pullPostBoolean('is_server', true));

        self::saveResource($laptop);
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
        $sdevice->setDual((bool)$request->pullPatchBoolean('dual_monitor', true));
        $sdevice->setSecondaryMonitor($request->pullPatchString('secondary_monitor', true));
    }

}
