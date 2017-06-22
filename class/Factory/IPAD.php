<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\IPAD as Resource;

class IPAD extends SystemDevice
{

    public function postNewIPAD(\Canopy\Request $request, $ipad)
    {
        $ipad->setGeneration($request->pullPostString('generation'));
        $ipad->setAppleID($request->pullPostString('apple_id'));
        $ipad->setProtectiveCase($request->pullPostBoolean('protective_case'));

        self::saveResource($ipad);
    }

    public static function assignDevice(Resource $device, $request)
    {
        $device->setFirstName($request->pullPatchString('first_name'));
        $device->setLastName($request->pullPatchString('last_name'));
        $device->setUsername($request->pullPatchString('username'));
        $device->setPhone($request->pullPatchString('phone'));
        $device->setSysPeriod($request->pullPatchString('system_usage'));
        $device->setAppleID($request->pullPatchString('apple_id'));
    }

}
