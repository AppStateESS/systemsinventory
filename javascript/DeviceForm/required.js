const required = {
  pc: {
    unassigned: [
      'physical_id',
      'purchase_date',
      'model',
      'mac',
      'model',
      'manufacturer',
      'processor',
      'video_card',
      'os',
      'ram',
      'hard_drive',
      'primary_monitor'
    ],
    assigned: [
      'department_id',
      'location_id',
      'room_number',
      'primary_ip',
      'vlan',
      'system_usage'
    ],
    user: ['username', 'first_name', 'last_name', 'phone']
  },
  ipad: {
    unassigned: [
      'physical_id', 'purchase_date', 'mac', 'hard_drive', 'generation'
    ],
    assigned: [
      'department_id',
      'location_id',
      'room_number',
      'primary_ip',
      'system_usage',
      'apple_id'
    ],
    user: ['username', 'first_name', 'last_name', 'phone']
  },
  printer: {
    unassigned: [
      'physical_id',
      'purchase_date',
      'mac',
      'manufacturer',
      'model',
      'toner'
    ],
    assigned: [
      'department_id', 'location_id', 'room_number', 'primary_ip'
    ],
    user: ['username', 'first_name', 'last_name', 'phone']
  },
  camera: {
    unassigned: [
      'model',
      'manufacturer',
      'resolution',
      'mac',
      'physical_id',
      'purchase_date'
    ],
    assigned: ['department_id', 'location_id', 'room_number', 'primary_ip']
  },
  sign: {
    unassigned: [
      'physical_id',
      'purchase_date',
      'mac',
      'model',
      'processor',
      'screen_manufacturer',
      'player_manfacturer',
      'screen_size',
      'ram',
      'hard_drive'
    ],
    assigned: [
      'department_id',
      'location_id',
      'room_number',
      'primary_ip',
      'vlan'
    ]
  },
  clock: {
    unassigned: [
      'physical_id',
      'purchase_date',
      'mac',
      'model',
      'manufacturer',
      'vlan'
    ],
    assigned: ['department_id', 'location_id', 'room_number', 'primary_ip']
  }
}

export default required
