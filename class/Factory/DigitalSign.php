<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\DigitalSign as Resource;

class DigitalSign extends SystemDevice
{

    public function postNewDigitalSign(\Canopy\Request $request, $digital_sign)
    {
        $digital_sign->setScreenSize(filter_input(INPUT_POST, 'screen_size',
                        FILTER_SANITIZE_STRING));
        $digital_sign->setScreenManufacturer(filter_input(INPUT_POST,
                        'screen_manufacturer', FILTER_SANITIZE_STRING));
        $digital_sign->setHiDef($request->pullPostBoolean('hi_def'));

        self::saveResource($digital_sign);
    }

    public static function assignDevice(Resource $device, $request)
    {
        $device->setVlan($request->pullPatchString('vlan', true));
    }

}
