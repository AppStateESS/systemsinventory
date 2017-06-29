'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class PC extends Component {
  constructor(props) {
    super(props)
  }

  YesNo(val) {
    return val
      ? <span>Yes</span>
      : <span>No</span>
  }

  render() {
    const {device} = this.props
    return (
      <tbody>
        <tr>
          <th>Secondary MAC</th>
          <td>{device.mac2}</td>
        </tr>
        <tr>
          <th>Manufacturer</th>
          <td>{device.manufacturer}</td>
        </tr>
        <tr>
          <th>Model</th>
          <td>{device.model}</td>
        </tr>
        <tr>
          <th>Hard drive size</th>
          <td>{device.hd_size}</td>
        </tr>
        <tr>
          <th>Processor</th>
          <td>{device.processor}</td>
        </tr>
        <tr>
          <th>RAM</th>
          <td>{device.ram}</td>
        </tr>
        <tr>
          <th>Primary monitor</th>
          <td>{device.primary_monitor}</td>
        </tr>
        <tr>
          <th>Secondary monitor</th>
          <td>{device.secondary_monitor}</td>
        </tr>
        <tr>
          <th>Video card</th>
          <td>{device.video_card}</td>
        </tr>
        <tr>
          <th>Operating system</th>
          <td>{device.os}</td>
        </tr>
        <tr>
          <th>Battery backup</th>
          <td>{this.YesNo(device.battery_backup)}</td>
        </tr>
        <tr>
          <th>Redundant backup</th>
          <td>{this.YesNo(device.redundant_backup)}</td>
        </tr>
        <tr>
          <th>Touch screen</th>
          <td>{this.YesNo(device.touch_screen)}</td>
        </tr>
        <tr>
          <th>Dual monitor</th>
          <td>{this.YesNo(device.dual_monitor)}</td>
        </tr>
        <tr>
          <th>Rotation</th>
          <td>{this.YesNo(device.rotation)}</td>
        </tr>
        <tr>
          <th>Stand</th>
          <td>{this.YesNo(device.stand)}</td>
        </tr>
        <tr>
          <th>Smart room</th>
          <td>{this.YesNo(device.smart_room)}</td>
        </tr>
        <tr>
          <th>Check in</th>
          <td>{this.YesNo(device.check_in)}</td>
        </tr>
        <tr>
          <th>Is server</th>
          <td>{this.YesNo(device.is_server)}</td>
        </tr>
        <tr>
          <th>Server type</th>
          <td>{device.server_type}</td>
        </tr>
      </tbody>
    )
  }
}

PC.propTypes = {
  device: PropTypes.object.isRequired
}
