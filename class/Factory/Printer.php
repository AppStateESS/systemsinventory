<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\Printer as Resource;

class Printer extends SystemDevice
{

    public function postNewPrinter(\Canopy\Request $request, $printer)
    {
        $printer->setTonerCartridge($request->pullPostString('toner_cartridge'));
        $printer->setColor($request->pullPostBoolean('color', true));
        $printer->setNetwork($request->pullPostBoolean('network', true));
        $printer->setDuplex($request->pullPostBoolean('duplex', true));
        
        self::saveResource($printer);
    }

    public function assignDevice(Resource $sdevice, $device, $request)
    {
        $device->setFirstName($request->pullPatchString('first_name'));
        $device->setLastName($request->pullPatchString('last_name'));
        $device->setUsername($request->pullPatchString('username'));
        $device->setPhone($request->pullPatchString('phone'));
    }

}
