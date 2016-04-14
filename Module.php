<?php

/**
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
namespace systemsinventory;

class Module extends \Module implements \SettingDefaults
{

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('sysinventory');
        $this->setProperName('Systems Inventory');
    }
    
    public function getController(\Request $request)
    {
        $cmd = $request->shiftCommand();
      
        if (\Current_User::allow('sysinventory')) {

            switch ($cmd) {                
                case 'system':
                    if(\Current_User::allow('systemsinventory', 'edit')){
                            $system = new \systemsinventory\Controller\System($this);
                            return $system;
                    }

                default:
                    $search = new \systemsinventory\Controller\Search($this);
                    return $search;
            }
        } else {
            \Current_User::requireLogin();
        }
      
    }

    public function runTime(\Request $request)
    {
      if(\Current_User::allow('sysinventory'))
	\systemsinventory\Controller\System::loadAdminBar();
    }

    public function getSettingDefaults()
    {
        // ContactInfo
        $settings['building'] = null;
        $settings['room_number'] = null;
        $settings['phone_number'] = null;
        $settings['fax_number'] = null;
        $settings['email'] = null;

        // Physical Address
        $settings['street'] = null;
        $settings['post_box'] = null;
        $settings['city'] = null;
        $settings['state'] = 'NC';
        $settings['zip'] = null;

        // Offsite
        $settings['links'] = null;

        // Map
        $settings['thumbnail_map'] = null;
        $settings['latitude'] = null;
        $settings['longitude'] = null;
        $settings['full_map_link'] = null;

        $settings['zoom'] = 17;
        $settings['dimension_x'] = '300';
        $settings['dimension_y'] = '300';

        return $settings;
    }

}
 
?>
