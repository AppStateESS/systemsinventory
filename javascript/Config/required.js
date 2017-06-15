const required = {
  allRequired: [
    'physical_id', 'purchase_date'
  ],
  pc: {
    userAssigned: true,
    profile: [
      'model',
      'manufacturer',
      'processor',
      'video_card',
      'os',
      'ram',
      'hd_size',
      'primary_monitor'
    ],
    unassigned: [
      'model',
      'mac',
      'model',
      'manufacturer',
      'processor',
      'video_card',
      'os',
      'ram',
      'hd_size',
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
    profile: [
      'hd_size', 'generation'
    ],
    unassigned: [
      'mac', 'hd_size', 'generation'
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
    userAssigned: true,
    profile: [
      'manufacturer', 'model', 'toner'
    ],
    unassigned: [
      'manufacturer', 'model', 'toner'
    ],
    assigned: [
      'department_id', 'location_id', 'room_number', 'primary_ip'
    ],
    user: ['username', 'first_name', 'last_name', 'phone']
  },
  camera: {
    userAssigned: false,
    profile: [
      'model', 'manufacturer', 'resolution'
    ],
    unassigned: [
      'model', 'manufacturer', 'resolution', 'mac'
    ],
    assigned: [
      'department_id', 'location_id', 'room_number', 'primary_ip'
    ],
    user: []
  },
  sign: {
    userAssigned: false,
    profile: [
      'model',
      'processor',
      'screen_manufacturer',
      'player_manfacturer',
      'screen_size',
      'ram',
      'hd_size'
    ],
    unassigned: [
      'mac',
      'model',
      'processor',
      'screen_manufacturer',
      'player_manfacturer',
      'screen_size',
      'ram',
      'hd_size'
    ],
    assigned: [
      'department_id', 'location_id', 'room_number', 'primary_ip', 'vlan'
    ],
    user: []
  },
  userAssigned: false,
  clock: {
    profile: [
      'model', 'manufacturer'
    ],
    unassigned: [
      'mac', 'model', 'manufacturer'
    ],
    assigned: [
      'department_id', 'location_id', 'room_number', 'primary_ip', 'vlan'
    ],
    user: []
  }
}

export default required
