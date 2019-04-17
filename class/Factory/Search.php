<?php

namespace systemsinventory\Factory;

use systemsinventory\Resource\SystemDevice as Resource;
use phpws2\Database;
use phpws2\Database\Conditional;

/**
 * @license http://opensource.org/licenses/lgpl-3.0.html
 * @author Ted Eberhard
 */
class Search extends \phpws2\ResourceFactory
{

    public $offset = 0;
    /**
     *  0 = all devices
     *  1 = Unassigned
     *  2 = Assigned
     *  3 = Surplus
     *  4 = Lost/Stolen
     * @var integer
     */
    
    public $status_type = 0;

    public function getDevices($request)
    {
        $deptbl = $loctbl = null;
        
        $db = Database::getDB();
        $sd = $db->addTable('systems_device');
        $exp = new \phpws2\Database\Expression('systems_device.*, count(*) OVER() as full_count');
        $sd->addField($exp);
        if ($this->status_type == 2) {
            $deptbl = $db->addTable('systems_department');
            $loctbl = $db->addTable('systems_location');
            $deptbl->addField('display_name', 'department_name');
            $loctbl->addField('display_name', 'location_name');
            
            $db->joinResources($sd, $deptbl,
                    new Conditional($db, $sd->getField('department_id'),
                    $deptbl->getField('id'), '='));
            $db->joinResources($sd, $loctbl,
                    new Conditional($db, $sd->getField('location_id'),
                    $loctbl->getField('id'), '='));
        }
        
        //$audit = $request->pullGetBoolean('audit', true);
        $audit = false;
        if($audit){
            $logtbl = $db->addTable('systems_log');    
            $logtbl->addField('timestamp', 'timestamp');
            $year_ago = strtotime('-1 year');
            $c1 = $logtbl->getFieldConditional('timestamp', $year_ago, '>');
            $c2 = $logtbl->getFieldConditional('device_id', null, 'is');
            $c3 = $db->createConditional($c1, $c2, 'or');
            $db->addConditional($c3);
            $db->joinResources($sd, $logtbl,
                new Conditional($db, $sd->getField('id'),
                $logtbl->getField('device_id'), '=', 'left outer join'));
        }
        
        $this->createSearchConditional($db, $sd, $request);

        // -1 means show everything at once
        if ($this->offset !== -1) {
            $db->setLimit(SYSINV_ROWS, SYSINV_ROWS * $this->offset);
        }

        $this->sort($request, $sd, $deptbl, $loctbl);
        $result = $db->select();
        return $result;
    }

    /**
     * 
     * @param \phpws2\Database\DB $db
     * @param \phpws2\Database\Table $tbl systems_device table object
     * @param type $request
     */
    private function createSearchConditional(\phpws2\Database\DB $db,
            \phpws2\Database\Table $tbl, $request)
    {
        $system_dep = \systemsinventory\Factory\SystemDevice::getSystemDepartments();

        $system_type = $request->pullGetArray('systemType', true);
        $department_id = $request->pullGetString('department', true);
        $location_id = $request->pullGetString('location', true);
        $physical_id = $request->pullGetString('physicalId', true);
        $model = $request->pullGetString('model', true);
        $username = $request->pullGetString('username', true);
        $purchase_date = $request->pullGetString('purchaseDate', true);
        $ip = $request->pullGetString('ipAddress', true);
        $mac = $request->pullGetString('macAddress', true);

        // Don't pull profiles
        $tbl->addFieldConditional('profile', 0);
                
        if ($system_type[0] !== 'all') {
            $tbl->addFieldConditional('device_type_id', $system_type, 'in');
        }

        foreach ($system_dep as $val) {
            $permitted_ids[] = $val['id'];
        }

        // only check against department if viewing assigned. Unassigned 
        // and surplus are only for admins
        if ($this->status_type == 2) {
            if ($department_id && in_array($department_id, $permitted_ids)) {
                $tbl->addFieldConditional('department_id', $department_id);
            } else {
                $tbl->addFieldConditional('department_id', $permitted_ids, 'in');
            }
        }

        if ($location_id) {
            $tbl->addFieldConditional('location_id', $location_id);
        }

        if (!empty($physical_id)) {
            $tbl->addFieldConditional('physical_id', "%$physical_id%", 'ilike');
        }

        if (!empty($model)) {
            $tbl->addFieldConditional('model', "%$model%", 'ilike');
        }

        if (!empty($username)) {
            $tbl->addFieldConditional('username', "%$username%", 'ilike');
        }

        if (!empty($purchase_date)) {
            $from_date = strtotime($purchase_date);
            $to_date = strtotime($purchase_date) + 86400;
            $tbl->addFieldConditional('purchase_date', $from_date, '>');
            $tbl->addFieldConditional('purchase_date', $to_date, '<');
        }

        if (!empty($ip)) {
            $c1 = $tbl->getFieldConditional('primary_ip', "%$ip%", 'like');
            $c2 = $tbl->getFieldConditional('secondary_ip', "%$ip%", 'like');
            $c3 = $db->createConditional($c1, $c2, 'or');
            $db->addConditional($c3);
        }

        if (!empty($search_vars['mac'])) {
            $c1 = $tbl->getFieldConditional('mac', "%$mac%", 'ilike');
            $c2 = $tbl->getFieldConditional('mac2', "%$mac%", 'ilike');
            $c3 = $db->createConditional($c1, $c2, 'or');
            $db->addConditional($c3);
        }

        switch ($this->status_type) {
            case 1:
                $tbl->addFieldConditional('status', 0);
                break;
            case 2:
                $c1 = $tbl->getFieldConditional('status', 1);
                $c2 = $tbl->getFieldConditional('status', 2);
                $c3 = $db->createConditional($c1, $c2, 'or');
                $db->addConditional($c3);
                break;
            case 3:
                $tbl->addFieldConditional('status', 3);
                break;
            
            case 4:
                $tbl->addFieldConditional('status', 4);

            default:
            // status_typeof 0 means show all
        }
    }

    private function sort($request, \phpws2\Database\Table $system_table,
            $dept_table = null, $location_table = null)
    {
        $sort = $request->pullGetArray('sort', true);
        if ($sort && $sort['direction'] !== '0') {
            $direction = $sort['direction'] === '1' ? 'asc' : 'desc';
            switch ($sort['column']) {
                case 'status':
                    $system_table->addOrderBy('status', $direction);
                    
                case 'physical':
                    $system_table->addOrderBy('physical_id', $direction);
                    break;

                case 'model':
                    $system_table->addOrderBy('model', $direction);
                    break;

                case 'location':
                    $location_table->addOrderBy('display_name', $direction);
                    break;

                case 'room':
                    $system_table->addOrderBy('room_number', $direction);
                    break;

                case 'username':
                    $system_table->addOrderBy('username', $direction);
                    break;

                case 'department':
                    $dept_table->addOrderBy('display_name', $direction);
                    break;

                case 'purchaseDate':
                    $system_table->addOrderBy('purchase_date', $direction);
                    break;
            }
        } else {
            $system_table->addOrderBy('physical_id', 'asc');
        }
    }

}
