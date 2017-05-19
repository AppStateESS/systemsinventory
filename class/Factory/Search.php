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

    public function getDevices($request)
    {
        $db = Database::getDB();
        $sd = $db->addTable('systems_device');
        $deptbl = $db->addTable('systems_department');
        $loctbl = $db->addTable('systems_location');
        $deptbl->addField('display_name', 'department_name');
        $loctbl->addField('display_name', 'location_name');
        $exp = new \phpws2\Database\Expression('systems_device.*, count(*) OVER() as full_count');
        $sd->addField($exp);
        $db->joinResources($sd, $deptbl,
                new Conditional($db, $sd->getField('department_id'),
                $deptbl->getField('id'), '='));
        $db->joinResources($sd, $loctbl,
                new Conditional($db, $sd->getField('location_id'),
                $loctbl->getField('id'), '='));
        $conditional = $this->createSearchConditional($db, $sd, $request);
        if (!empty($conditional)) {
            $db->addConditional($conditional);
        }

        // -1 means show everything at once
        if ($this->offset !== -1) {
            $db->setLimit(SYSINV_ROWS, SYSINV_ROWS * $this->offset);
        }

        $this->sort($request, $sd, $deptbl, $loctbl);
        $result = $db->select();
        return $result;
    }

    private function createSearchConditional(\phpws2\Database\DB $db,
            \phpws2\Database\Table $tbl, $request)
    {
        $conditional = NULL;
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

        if ($system_type[0] !== 'all') {
            $tbl->addFieldConditional('device_type_id', $system_type, 'in');
        }

        foreach ($system_dep as $val) {
            $permitted_ids[] = $val['id'];
        }

        if ($department_id && in_array($department_id, $permitted_ids)) {
            $tbl->addFieldConditional('department_id', $department_id);
        } else {
            $tbl->addFieldConditional('department_id', $permitted_ids, 'in');
        }

        if ($location_id) {
            $tbl->addFieldConditional('location_id', $location_id);
        }

        if (!empty($physical_id)) {
            $tbl->addFieldConditional('physical_id', "%$physical_id%", 'like');
        }

        if (!empty($model)) {
            $tbl->addFieldConditional('model', "%$model%", 'like');
        }

        if (!empty($username)) {
            $tbl->addFieldConditional('username', "%$username%", 'LIKE');
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
            $db->addConditional($c1, $c2, 'or');
        }

        if (!empty($search_vars['mac'])) {
            $c1 = $tbl->getFieldConditional('mac', "%$mac%", 'like');
            $c2 = $tbl->getFieldConditional('mac2', "%$mac%", 'like');
            $db->addConditional($c1, $c2, 'or');
        }
        return $conditional;
    }

    private function sort($request, \phpws2\Database\Table $system_table,
            \phpws2\Database\Table $dept_table,
            \phpws2\Database\Table $location_table)
    {
        $sort = $request->pullGetArray('sort', true);
        if ($sort && $sort['direction'] !== '0') {
            $direction = $sort['direction'] === '1' ? 'asc' : 'desc';
            switch ($sort['column']) {
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
            }
        }
    }

}
