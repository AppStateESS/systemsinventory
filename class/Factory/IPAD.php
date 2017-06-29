<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\IPAD as Resource;

class IPAD extends SystemDevice
{

    public function postNewIPAD(\Canopy\Request $request, $ipad)
    {
        $ipad->setGeneration($request->pullPostString('generation'));
        $ipad->setProtectiveCase((bool)$request->pullPostBoolean('protective_case', true));

        self::saveResource($ipad);
    }

    public static function assignDevice(Resource $sdevice, $device, $request)
    {
        $device->setFirstName($request->pullPatchString('first_name'));
        $device->setLastName($request->pullPatchString('last_name'));
        $device->setUsername($request->pullPatchString('username'));
        $device->setPhone($request->pullPatchString('phone'));
        $sdevice->setSystemUsage($request->pullPatchString('system_usage'));
        $sdevice->setAppleID($request->pullPatchString('apple_id'));
    }

}
