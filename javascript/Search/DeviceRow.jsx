'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DeviceRow extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  deviceType(device_id) {
    switch (device_id) {
      case 1:
        return 'PC'
      case 2:
        return 'Server'
      case 3:
        return 'iPad'
      case 4:
        return 'Printer'
      case 5:
        return 'Camera'
      case 6:
        return 'Digital sign'
      case 7:
        return 'Time clock'
      default:
        'Unknown'
    }
  }

  render() {
    const {
      physical_id,
      model,
      room_number,
      username,
      department_name,
      location_name,
      device_type_id
    } = this.props.value

    return (
      <tr onClick={this.props.showOverlay}>
        <td>
          {this.deviceType(device_type_id)}
        </td>
        <td>
          {physical_id}
        </td>
        <td>
          {model}
        </td>
        <td>
          {location_name}
        </td>
        <td>
          {room_number}
        </td>
        <td>
          {username}
        </td>
        <td>
          {department_name}
        </td>
      </tr>
    )
  }
}

DeviceRow.propTypes = {
  value: PropTypes.object,
  showOverlay: PropTypes.func
}
