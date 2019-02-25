<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class Laptop extends \phpws2\Resource
{

    protected $device_id;
    protected $primary_monitor;
    protected $video_card;
    protected $os;
    protected $system_usage;
    protected $battery_backup;
    protected $redundant_backup;
    protected $docking_station;
    protected $check_in;
    protected $touch_screen;
    protected $smart_room;
    protected $table = 'systems_laptop';

    public function __construct()
    {
        parent::__construct();
        $this->device_id = new \phpws2\Variable\IntegerVar(0, 'device_id');
        $this->primary_monitor = new \phpws2\Variable\TextOnly(null,
                'primary_monitor');
        $this->primary_monitor->allowNull(true);
        $this->video_card = new \phpws2\Variable\TextOnly(null, 'video_card');
        $this->video_card->allowNull(true);
        $this->os = new \phpws2\Variable\TextOnly(null, 'os');
        $this->os->allowNull(true);
        $this->system_usage = new \phpws2\Variable\IntegerVar(0, 'system_usage');
        $this->system_usage->allowNull(true);
        $this->battery_backup = new \phpws2\Variable\BooleanVar(false,
                'battery_backup');
        $this->redundant_backup = new \phpws2\Variable\BooleanVar(false,
                'redundant_backup');
        $this->docking_station = new \phpws2\Variable\BooleanVar(false, 'docking_station');
        $this->touch_screen = new \phpws2\Variable\BooleanVar(false,
                'touch_screen');
        $this->check_in = new \phpws2\Variable\BooleanVar(false, 'check_in');
        $this->smart_room = new \phpws2\Variable\BooleanVar(false, 'smart_room');
    }

    public function setDeviceID($device_id)
    {
        $this->device_id->set($device_id);
    }

    public function setPeripheralID($peripheral_id)
    {
        if (empty($peripheral_id)) {
            $peripheral_id = 0;
        }
        $this->peripheral_id->set($peripheral_id);
    }

    public function setPrimaryMonitor($primary_monitor)
    {
        $this->primary_monitor->set($primary_monitor);
    }

    public function setVideoCard($video_card)
    {
        $this->video_card->set($video_card);
    }

    public function setOS($os)
    {
        $this->os->set($os);
    }

    public function setSystemUsage($system_usage)
    {
        $this->system_usage->set($system_usage);
    }

    public function setBatteryBackup($battery_backup)
    {
        $this->battery_backup->set($battery_backup);
    }

    public function setRedundantBackup($redundant_backup)
    {
        $this->redundant_backup->set($redundant_backup);
    }

    public function setDockingStation($docking_station)
    {
        $this->docking_station->set($docking_station);
    }

    public function setSmartRoom($smart)
    {
        $this->smart_room->set($smart);
    }

    public function setTouchScreen($touch)
    {
        $this->touch_screen->set($touch);
    }

    public function setCheckIn($check_in)
    {
        $this->check_in->set($check_in);
    }


}
