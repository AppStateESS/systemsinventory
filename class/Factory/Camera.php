<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\Camera as Resource;

class Camera extends SystemDevice
{

    public function postNewCamera(\Canopy\Request $request, Resource $camera)
    {
        $vars = $request->pullPostVars();

        $camera->setMegapixels($request->pullPostString('megapixels', true));
        $camera->setSDSupport((bool) $request->pullPostBoolean('sd_support',
                        true));
        $camera->setHiDef((bool) $request->pullPostBoolean('hi_def', true));

        self::saveResource($camera);
    }

    public static function assignDevice(Resource $sdevice, $device, $request)
    {
        $sdevice->setCovert($request->pullPatchBoolean('covert'));
        $sdevice->setExterior($request->pullPatchBoolean('exterior'));
        $sdevice->setOn($request->pullPatchBoolean('is_on'));
    }

}
