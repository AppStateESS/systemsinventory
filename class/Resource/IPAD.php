<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class IPAD extends \phpws2\Resource
{

    protected $device_id;
    protected $generation;
    protected $apple_id;
    protected $protective_case;
    protected $table = 'systems_ipad';
    protected $system_usage;

    public function __construct()
    {
        parent::__construct();
        $this->device_id = new \phpws2\Variable\IntegerVar(0, 'device_id');
        $this->generation = new \phpws2\Variable\TextOnly(null, 'generation');
        $this->generation->allowNull(true);
        $this->apple_id = new \phpws2\Variable\TextOnly(null, 'apple_id');
        $this->apple_id->allowNull(true);
        $this->protective_case = new \phpws2\Variable\BooleanVar(false, 'protective_case');
        $this->system_usage = new \phpws2\Variable\TextOnly(null, 'system_usage');
    }

    public function setDeviceID($device_id)
    {
        $this->device_id->set($device_id);
    }

    public function setGeneration($generation)
    {
        $this->generation->set($generation);
    }

    public function setAppleID($apple_id)
    {
        $this->apple_id->set($apple_id);
    }

    public function setProtectiveCase($case)
    {
        $this->protective_case->set($case);
    }

    public function setPhone($phone)
    {
        $this->phone->set($phone);
    }
    
    public function setSystemUsage($system_usage)
    {
        $this->system_usage->set($system_usage);
    }

}
