'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Device from '../Mixin/Device.js'

export default class Assigned extends Component {
  constructor(props) {
    super(props)
  }

  systemUsage() {
    switch (this.props.device.system_usage) {
      case 1:
        return 'Staff'
      case 2:
        return 'Student'
      case 3:
        return 'Public'
    }
  }

  render() {
    const {device} = this.props
    let secondaryIp
    if (Device.isPc(device)) {
      secondaryIp = (
        <tr>
          <th>Secondary IP</th>
          <td>{device.secondary_ip}</td>
        </tr>
      )
    }

    let vlan
    if (Device.isPc(device) || Device.isClock(device) || Device.isSign(device)) {
      vlan = (
        <tr>
          <th>VLAN</th>
          <td>{device.vlan_full}</td>
        </tr>
      )
    }
    let systemUsage
    if (Device.isPc(device) || Device.isIpad(device)) {
      systemUsage = (
        <tr>
          <th>System usage</th>
          <td>{this.systemUsage()}</td>
        </tr>
      )
    }
    let staff
    if (device.status === 1) {
      staff = (
        <tbody>
          <tr>
            <th>Staff member</th>
            <td>{device.first_name} {device.last_name}&nbsp;({device.username})</td>
          </tr>
          <tr>
            <th>Contact phone number</th>
            <td>{device.phone}</td>
          </tr>
        </tbody>
      )
    }
    return (
      <div>
        <h3>Assignment information</h3>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Building</th>
              <td>{device.location}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{device.department}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{device.room_number}</td>
            </tr>
            <tr>
              <th>Primary IP</th>
              <td>{device.primary_ip}</td>
            </tr>
            {secondaryIp}
            {vlan}
            {systemUsage}
          </tbody>
          {staff}
        </table>
      </div>
    )
  }
}

Assigned.propTypes = {
  device: PropTypes.object.isRequired
}
