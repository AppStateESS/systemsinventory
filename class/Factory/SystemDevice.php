<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\SystemDevice as Resource;
use systemsinventory\Resource\PC as PCResource;
use systemsinventory\Resource\Camera as CameraResource;
use systemsinventory\Resource\DigitalSign as DigitalSignResource;
use systemsinventory\Resource\IPAD as IPADResource;
use systemsinventory\Resource\Printer as PrinterResource;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard
 */
class SystemDevice extends \phpws2\ResourceFactory
{

    public function unassign(\Canopy\Request $request)
    {
        $device = new Resource;
        $device->setId($request->pullPatchInteger('device_id'));
        self::loadByID($device);
        $device->setStatus(0);
        $device->setDepartment(null);
        $device->setLocation(null);
        $device->setRoomNumber(null);
        $device->setPrimaryIP(null);
        $device->setSecondaryIP(null);
        $device->setVlan(0);
        $device->setFirstName(null);
        $device->setLastName(null);
        $device->setUserName(null);
        $device->setPhone(null);
        self::saveResource($device);
    }

    public function postDevice(\Canopy\Request $request)
    {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
        $device = new Resource;

        $id = $request->pullPostInteger('id', true);
        if ($id) {
            $device->setId($id);
            $this->loadByID($device);
        } else {
            $device->setDeviceType($request->pullPostInteger('device_type_id'));
            if ($device->isPC() && $request->pullPostInteger('is_server', true)) {
                $device->setDeviceType(SERVER);
            }
        }

        $device->setPurchaseDate($request->pullPostString('purchase_date', true));
        $device->setPhysicalID($request->pullPostString('physical_id'));

        if (!$device->isPrinter()) {
            $device->setMac($request->pullPostString('mac'));
        }

        $notes = $request->pullPostString('notes', true);
        $device->setNotes($notes ? $notes : '');

        if ($request->postVarIsset('mac2')) {
            $device->setMac2($request->pullPostString('mac2'));
        }

        if ($request->postVarIsset('model')) {
            $device->setModel($request->pullPostString('model'));
        }
        if ($request->postVarIsset('hd_size')) {
            $device->setHdSize($request->pullPostString('hd_size'));
        }
        if ($request->postVarIsset('processor')) {
            $device->setProcessor($request->pullPostString('processor'));
        }
        if ($request->postVarIsset('ram')) {
            $device->setRam($request->pullPostString('ram'));
        }
        if ($request->postVarIsset('manufacturer')) {
            $device->setManufacturer($request->pullPostString('manufacturer',
                            true));
        }

        $profile_name = $request->pullPostString('profile_name', true);
        if (!empty($profile_name)) {
            $device->setProfile(TRUE);
            $device->setProfileName($profile_name);
        }

        self::saveResource($device);
        return $device;
    }

    public static function assign(\Canopy\Request $request)
    {
        $device_id = $request->pullPatchInteger('id');
        $device = new Resource;
        $device->setId($device_id);
        self::loadByID($device);
        self::assignByType($device);

        $location_id = $request->pullPatchInteger('location_id');
        $device->setLocation($location_id ? $location_id : null);

        $department_id = $request->pullPatchInteger('department_id');
        $device->setDepartment($department_id ? $department_id : null);

        $device->setNotes($request->pullPatchString('notes'));
        $device->setPrimaryIP($request->pullPatchString('primary_ip'));

        if ($request->patchVarIsset('room_number')) {
            $device->setRoomNumber($request->pullPatchString('room_number'));
        }

        self::saveResource($device);
        return $device;
    }

    private static function assignByType(Resource $device)
    {
        switch ($device->getDeviceType()) {
            case PC:
            case SERVER:
                PC::assignDevice($device, $request);
                break;

            case IPAD:
                IPAD::assignDevice($device, $request);
                break;

            case PRINTER:
                break;

            case CAMERA:
                Camera::assignDevice($device, $request);
                break;

            case DIGITAL_SIGN:
                DigitalSign::assignDevice($device, $request);
                break;

            case TIME_CLOCK:
                self::assignDevice($device, $request);
                break;
        }
    }

    private static function assignClock($device, $request)
    {
        $device->setVlan($request->pullPatchString('vlan', true));
    }

    public static function getSystemDetails($system_id)
    {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/device_types.php");
        $device_details = array();
        if (empty($system_id)) {
            throw new \Exception("System ID invalid.");
        }
        // get the common device attributes
        $db = \phpws2\Database::getDB();
        $query = "SELECT * FROM systems_device WHERE id='$system_id'";
        $pdo = $db->query($query);
        $result = $pdo->fetch(\PDO::FETCH_ASSOC);
        $device_type_id = $result['device_type_id'];
        $device_details = $result;
        // get the device specific attributes
        $table = SystemDevice::getSystemType($device_type_id);
        if (!empty($table)) {
            $device_table = $db->addTable($table);
            $device_table->addFieldConditional('device_id', $system_id);
            $device_result = $db->selectOneRow();
            // set the specific device id so we can use it to save the device specific info later.
            if (!empty($device_result)) {
                $specific_device_id = $device_result['id'];
                unset($device_result['id']);
                $device_result['specific-device-id'] = $specific_device_id;
                //$device_attr = SystemDevice::getDeviceAttributes($device_type_id);
                $device_details = array_merge($device_details, $device_result);
            }
        }
        $device_details['device-type-id'] = $device_type_id;
        $purchase_date = $device_details['purchase_date'];
        $device_details["purchase_date"] = date('Y-m-d', $purchase_date);

        return $device_details;
    }

    public static function getProfile($profile_id)
    {
        if (empty($profile_id)) {
            throw new Exception("System profile id empty.");
        }
        $db = \phpws2\Database::getDB();
        $system_table = $db->addTable("systems_device");
        $system_table->addFieldConditional('id', $profile_id);
        $result = $db->select();
        $profile_result = $result['0'];
        $device_type_id = $profile_result['device_type_id'];
        $profile_result['device-type-id'] = $device_type_id;
        $device_id = $profile_result['id'];
        $table = SystemDevice::getSystemType($device_type_id);
        if (!empty($table)) {
            $device_table = $db->addTable($table);
            $device_table->addFieldConditional('device_id', $device_id);
            $result = $db->select();
            $result = $result['0'];
            $specific_device_id = $result['id'];
            unset($result['id']);
            $profile_result = array_merge($profile_result, $result);
            $profile_result['specific-device-id'] = $specific_device_id;
        }
        return $profile_result;
    }

    public static function searchPhysicalID($physical_id)
    {
        $db = \phpws2\Database::getDB();
        $system_table = $db->addTable("systems_device");
        $system_table->addFieldConditional('physical_id', $physical_id);
        $search_result = $db->select();
        $result = array('exists' => false);
        if ($search_result)
            $search_result = $search_result['0'];
        if (!empty($search_result['id']))
            $result['exists'] = true;
        return $result;
    }

    public static function loadSpecificByDevice($device)
    {
        switch ($device->getDeviceType()) {
            case '1':
            case '2':
                $specific_device = new PCResource;
                break;
            case '3':
                $specific_device = new IPADResource;
                break;
            case '4':
                $specific_device = new PrinterResource;
                break;
            case '5':
                $specific_device = new CameraResource;
                break;
            case '6':
                $specific_device = new DigitalSignResource;
                break;

            case '7':
                return;
        }
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable(self::getSystemType($device->getDeviceType()));
        $tbl->addFieldConditional('device_id', $device->getId());
        $row = $db->selectOneRow();
        if ($row) {
            $specific_device->setVars($row);
        } else {
            $specific_device->setDeviceID($device->getId());
        }
        return $specific_device;
    }

    public static function deleteDevice($device_id)
    {
        $systems_device = new Resource;
        $systems_device->setId($device_id);
        if (!parent::loadByID($systems_device)) {
            throw new \Exception('Cannot load resource. System id not found:' . $device_id);
        }
        if ($systems_device->getDeviceType() !== TIME_CLOCK) {
            $specific_device = self::loadSpecificByDevice($systems_device);
            // This could be more restrictive but in case there is a faulty device
            // without an accompanying specific, you should be able to move on and
            // delete it.
            if ($specific_device->getId()) {
                if (!SystemDevice::deleteResource($specific_device)) {
                    throw new \Exception('Cannot delete specific resource. Query failed');
                }
            }
        }
        if (!SystemDevice::deleteResource($systems_device)) {
            throw new \Exception('Cannot delete resource. Query failed');
        }
    }

    public static function markDeviceInventoried($device_id)
    {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/log_types.php");
        $timestamp = time();
        $log_type = INVENTORY_AUDIT;
        $username = \Current_User::getUsername();
        $db = \Database::getDB();
        $query = "INSERT INTO systems_log (username, device_id, log_type, timestamp) VALUES('$username', '$device_id', '$log_type', '$timestamp')";
        $result = $db->query($query);
        if (empty($result)) {
            return 0; //should be exception
        }
        return array("success" => "1", "timestamp" => date("F j, Y, g:i a",
                    $timestamp), "username" => $username);
    }

    public static function getDeviceAudits($device_id)
    {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/log_types.php");
        $current_time = time();
        $one_year = 31536000;
        $db = \Database::getDB();
        $tbl = $db->addTable('systems_log');
        $tbl->addField('username');
        $tbl->addField('timestamp');
        $condition0 = new \Database\Conditional($db, 'device_id', $device_id,
                '=');
        $condition1 = new \Database\Conditional($db, 'log_type',
                INVENTORY_AUDIT, '=');
        $conditional = new \Database\Conditional($db, $condition0, $condition1,
                'AND');
        $db->addConditional($conditional);
        $tbl->addOrderBy('timestamp', 'DESC');
        $result = $db->select();

        if (empty($result)) {
            return;
        } else {
            if (($current_time - $result[0]['timestamp']) > $one_year) {
                $overdue = 1;
            } else {
                $overdue = 0;
            }

            foreach ($result as $key => $value) {
                $result[$key]["timestamp"] = date("F j, Y, g:i a",
                        $value['timestamp']);
            }
            $result['audit_overdue'] = $overdue;
        }

        return $result;
    }

    public static function getUserByUsername($username)
    {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/defines.php");
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($curl, CURLOPT_URL, FACULTY_API_URL . "/$username");
        $faculty_result = curl_exec($curl);
        $faculty_result = json_decode($faculty_result, true);
        curl_setopt($curl, CURLOPT_URL, STUDENT_API_URL . "/$username");
        $student_result = curl_exec($curl);
        $student_result = json_decode($student_result, true);
        $result = NULL;
        curl_close($curl);
        if (!empty($faculty_result))
            return $faculty_result;
        else
            return $student_result;
    }

    public static function searchUserByUsername($username)
    {
        include_once(PHPWS_SOURCE_DIR . "mod/systemsinventory/config/defines.php");
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_URL, FACULTY_API_URL . "?username=$username");
        $faculty_result = curl_exec($curl);
        $faculty_result = json_decode($faculty_result, true);
        curl_setopt($curl, CURLOPT_URL, STUDENT_API_URL . "?username=$username");
        $student_result = curl_exec($curl);
        $student_result = json_decode($student_result, true);
        $result = NULL;
        if (!empty($faculty_result))
            $result = $faculty_result;
        if (!empty($student_result)) {
            if (!empty($result))
                $result = array_merge($result, $student_result);
            else
                $result = $student_result;
        }
        curl_close($curl);
        return $result;
    }

    public static function getDeviceAttributes($type_id)
    {
        $systems_pc = array("device_id" => NULL, "os" => "OS", "primary_monitor" => "Primary Monitor", "secondary_monitor" => "Secondary Monitor", "video_card" => "Video Card", "server_type" => NULL, "battery_backup" => NULL, "redundant_backup" => NULL, "touch_screen" => "Touch Screen", "smart_room" => "Smart Room", "dual_monitor" => "Dual Monitor", "system_usage" => NULL, "rotation" => "Rotation", "stand" => "Stand", "check_in" => "Check In");
        $systems_server = array("device_id" => NULL, "os" => "OS", "primary_monitor" => "Primary Monitor", "secondary_monitor" => "Secondary Monitor", "video_card" => "Video Card", "server_type" => NULL, "battery_backup" => NULL, "redundant_backup" => NULL, "touch_screen" => "Touch Screen", "smart_room" => "Smart Room", "dual_monitor" => "Dual Monitor", "system_usage" => NULL, "rotation" => "Rotation", "stand" => "Stand", "check_in" => "Check In");
        $systems_ipad = array("device_id" => NULL, "generation" => "Generation", "apple_id" => "Apple ID");
        $systems_printer = array("device_id" => NULL, "toner_cartridge" => "Toner Cartridge", "color" => "Color", "network" => "Network", "duplex" => "Duplex");

        switch ($type_id) {
            case '1':
                $attr = $systems_pc;
                break;
            case '2':
                $attr = $systems_server;
                break;
            case '3':
                $attr = $systems_ipad;
                break;
            case '4':
                $attr = $systems_printer;
                break;
            case '5':
                $attr = $systems_camera;
                break;
            case '6':
                $attr = $digital_sign;
                break;
            case '7':
                $attr = $systems_timeclock;
                break;
            default:
                $attr = $systems_pc;
        }
        return $attr;
    }

    public static function getSystemType($type_id)
    {
        switch ($type_id) {
            case '1':
            case '2':
                $table = 'systems_pc';
                break;
            case '3':
                $table = 'systems_ipad';
                break;
            case '4':
                $table = 'systems_printer';
                break;
            case '5':
                $table = 'systems_camera';
                break;
            case '6':
                $table = 'systems_digital_sign';
                break;
            case '7':
                $table = NULL;
                break;
            default:
                $table = 'systems_pc';
        }
        return $table;
    }

    public static function getLocationByID($location_id)
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('systems_location');
        $tbl->addField('description');
        $tbl->addFieldConditional('id', $location_id, '=');
        $result = $db->select();
        if (empty($result))
            return 0; //should be exception
        return $result[0]['description'];
    }

    public static function getDepartmentByID($department_id)
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('systems_department');
        $tbl->addField('description');
        $tbl->addFieldConditional('id', $department_id, '=');
        $result = $db->select();
        if (empty($result))
            return 'Not Found'; //should be exception

        return $result[0]['description'];
    }

    public static function getSystemLocations()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('systems_location');
        $tbl->addField('id');
        $tbl->addField('display_name');
        $result = $db->select();
        if (empty($result))
            return 0; //should be exception
        return $result;
    }

    public static function getSystemTypes()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('systems_device_type');
        $tbl->addField('id');
        $tbl->addField('description');
        $result = $db->select();
        if (empty($result))
            return 0; //should be exception
        return $result;
    }

    public static function getUserPermissions($user_id)
    {
        $permission_db = \phpws2\Database::getDB();
        $permissions_tbl = $permission_db->addTable('systems_permission');
        $permissions_tbl->addField('departments');
        $permissions_tbl->addField('user_id');
        $permissions_tbl->addFieldConditional('user_id', $user_id);
        $permission_result = $permission_db->select();
        return $permission_result;
    }

    public static function getSystemDepartments()
    {
        $user_id = \Current_User::getId();
        $permission_result = self::getUserPermissions($user_id);
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('systems_department');
        $tbl->addField('id');
        $tbl->addField('display_name');
        $tbl->addFieldConditional('active', '1');
        $tbl->addFieldConditional('id', '1', '!=');
        $tbl->addOrderBy('display_name');
        if (!empty($permission_result)) {
            $dep = $permission_result[0]['departments'];
            $deps = explode(':', $dep);
            $cond = NULL;
            foreach ($deps as $val) {
                $tmp_cond = new \phpws2\Database\Conditional($db, 'id', $val,
                        '=');
                if (empty($cond))
                    $cond = $tmp_cond;
                else
                    $cond = new \phpws2\Database\Conditional($db, $cond,
                            $tmp_cond, 'OR');
            }
            $db->addConditional($cond);
        }
        $result = $db->select();

        if (empty($result)) {
            throw new \Exception('System departments not found');
        }
        return $result;
    }

    public static function getSystemProfiles()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('systems_device');
        $tbl->addFieldConditional('profile', 1);
        $tbl->addField('id');
        $tbl->addField('profile_name');
        $tbl->addField('device_type_id');
        $result = $db->select();
        if (empty($result))
            return 0; //should be exception
        return $result;
    }

    public static function getProfilesJson()
    {
        $profileArray = array();
        $profiles = self::getSystemProfiles();
        if (empty($profiles)) {
            $profiles = '{}';
        } else {
            foreach ($profiles as $p) {
                $profileArray[$p['device_type_id']][] = array('id' => $p['id'], 'name' => $p['profile_name']);
            }
            $profiles = json_encode($profileArray);
        }
        return "<script>let profiles = $profiles</script>";
    }

    public static function display()
    {

        //$contact_info = self::load();
        //$values = self::getValues($contact_info);

        $template = new \phpws2\Template($values);
        $template->setModuleTemplate('systemsinventory', 'view.html');
        $content = $template->get();
        return $content;
    }

    public static function currentUserRestricted()
    {
        if (\Current_User::isDeity()) {
            return false;
        }
        $depts = self::getUserPermissions(\Current_User::getId());
        return !empty($depts);
    }

    public static function getFilterScript()
    {
        $restricted = self::currentUserRestricted() ? 'true' : 'false';
        $filter = self::getSearchFilterJson();
        return <<<EOF
<script>
    const restricted=$restricted;
    const jsonFilters = $filter
</script>
EOF;
    }

    public static function getSearchFilterJson()
    {
        $filters = self::getJsonSearchFilters();
        return json_encode($filters);
    }

    private static function systemLabel($label)
    {
        switch ($label) {
            case 'pc':
                return 'PC';
            case 'ipad':
                return 'Tablet';
            default:
                return ucfirst($label);
        }
    }

    public static function getJsonSearchFilters()
    {
        $system_types = self::getSystemTypes();
        foreach ($system_types as $val) {
            $filters['system_types'][] = array('value' => $val['id'], 'label' => $val['description'], 'name' => self::systemLabel($val['description']));
        }
        $departments = self::getSystemDepartments();
        foreach ($departments as $val) {
            $filters['departments'][] = array('value' => $val['id'], 'label' => $val['display_name']);
        }
        $locations = self::getSystemLocations();
        foreach ($locations as $val) {
            $filters['locations'][] = array('value' => $val['id'], 'label' => $val['display_name']);
        }
        $filters['vlan'][] = array('value' => 1, 'label' => 'Admin');
        $filters['vlan'][] = array('value' => 2, 'label' => 'Closed');
        $filters['vlan'][] = array('value' => 3, 'label' => 'Public');
        $filters['vlan'][] = array('value' => 4, 'label' => 'VOIP');

        $filters['system_usage'][] = array('value' => 1, 'label' => 'Staff');
        $filters['system_usage'][] = array('value' => 2, 'label' => 'Student');
        $filters['system_usage'][] = array('value' => 3, 'label' => 'Public');
        return $filters;
    }

    public static function view($id)
    {
        $values = self::getSystemDetails($id);

        switch ($values['status']) {
            case 0:
                $status = 'Not assigned';
                break;
            case 1:
                $status = 'Assigned - Staff / Student';
                break;
            case 2:
                $status = 'Assigned - Location';
                break;
            case 3:
                $status = 'Waiting for surplus';
                break;
        }
        $new_values['Status'] = $status;

        foreach ($values as $key => $value) {
            switch ($key) {
                case 'location_id':
                    $value = self::getLocationByID($value);
                    $new_key = 'Location';
                    break;

                case 'department_id':
                    $value = self::getDepartmentByID($value);
                    $new_key = 'Department';
                    break;

                case 'status':
                    continue;

                case 'battery_backup':
                case 'redundant_backup':
                case 'touch_screen':
                case 'dual_monitor':
                case 'rotation':
                case 'stand':
                case 'smart_room':
                case 'check_in':
                case 'is_server':
                    $value = $value ? '<span class="text-success"><i class="fa fa-check"></i> Yes</span>' : '<span class="text-danger"><i class="fa fa-times"></i> No</span>';
                    $new_key = ucfirst(str_replace('_', ' ', $key));
                    break;

                default:
                    $new_key = ucfirst(str_replace('_', ' ', $key));
            }
            $new_values[$new_key] = $value;
        }
        $vars['system_values'] = $new_values;
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('systemsinventory', 'SystemView.html');
        return $template->get();
    }

}
