<?php

namespace systemsinventory\Resource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard <eberhardtm at appstate dot edu>
 */
class PC extends \phpws2\Resource
{

    protected $device_id;
    protected $primary_monitor;
    protected $secondary_monitor;
    protected $video_card;
    protected $os;
    protected $server_type;
    protected $system_usage;
    protected $battery_backup;
    protected $redundant_backup;
    protected $rotation;
    protected $stand;
    protected $check_in;
    protected $touch_screen;
    protected $dual_monitor;
    protected $smart_room;
    protected $is_server;
    protected $table = 'systems_pc';

    public function __construct()
    {
        parent::__construct();
        $this->device_id = new \phpws2\Variable\IntegerVar(0, 'device_id');
        $this->primary_monitor = new \phpws2\Variable\TextOnly(null,
                'primary_monitor');
        $this->primary_monitor->allowNull(true);
        $this->secondary_monitor = new \phpws2\Variable\TextOnly(null,
                'secondary_monitor');
        $this->secondary_monitor->allowNull(true);
        $this->video_card = new \phpws2\Variable\TextOnly(null, 'video_card');
        $this->video_card->allowNull(true);
        $this->os = new \phpws2\Variable\TextOnly(null, 'os');
        $this->os->allowNull(true);
        $this->server_type = new \phpws2\Variable\TextOnly(null, 'server_type');
        $this->server_type->allowNull(true);
        $this->system_usage = new \phpws2\Variable\IntegerVar(0, 'system_usage');
        $this->system_usage->allowNull(true);
        $this->is_server = new \phpws2\Variable\BooleanVar(0, 'is_server');
        $this->battery_backup = new \phpws2\Variable\BooleanVar(false,
                'battery_backup');
        $this->redundant_backup = new \phpws2\Variable\BooleanVar(false,
                'redundant_backup');
        $this->rotation = new \phpws2\Variable\BooleanVar(false, 'rotation');
        $this->stand = new \phpws2\Variable\BooleanVar(false, 'stand');
        $this->touch_screen = new \phpws2\Variable\BooleanVar(false,
                'touch_screen');
        $this->dual_monitor = new \phpws2\Variable\BooleanVar(false,
                'dual_monitor');
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

    public function setSecondaryMonitor($secondary_monitor)
    {
        $this->secondary_monitor->set($secondary_monitor);
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

    public function setServerType($server_type)
    {
        $this->server_type->set($server_type);
    }

    public function setBatteryBackup($battery_backup)
    {
        $this->battery_backup->set($battery_backup);
    }

    public function setRedundantBackup($redundant_backup)
    {
        $this->redundant_backup->set($redundant_backup);
    }

    public function setRotation($rotation)
    {
        $this->rotation->set($rotation);
    }

    public function setStand($stand)
    {
        $this->stand->set($stand);
    }

    public function setSmartRoom($smart)
    {
        $this->smart_room->set($smart);
    }

    public function setTouchScreen($touch)
    {
        $this->touch_screen->set($touch);
    }

    public function setDual($dual)
    {
        $this->dual_monitor->set($dual);
    }

    public function setCheckIn($check_in)
    {
        $this->check_in->set($check_in);
    }

    public function setIsServer($server)
    {
        $this->is_server->set($server);
    }
    
}
