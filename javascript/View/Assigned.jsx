'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Assigned extends Component {
  constructor(props) {
    super(props)
  }

  systemUsage() {
    console.log(this.props.device.system_usage);
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
    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Building</th>
              <td>{device.location_id}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{device.department_id}</td>
            </tr>
            <tr>
              <th>Primary IP</th>
              <td>{device.primary_ip}</td>
            </tr>
            <tr>
              <th>Secondary IP</th>
              <td>{device.secondary_ip}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{device.room_number}</td>
            </tr>
            <tr>
              <th>VLAN</th>
              <td>{device.vlan}</td>
            </tr>
            <tr>
              <th>Staff member</th>
              <td>{device.first_name} {device.last_name}</td>
            </tr>
            <tr>
              <th>System usage</th>
              <td>{this.systemUsage()}</td>
            </tr>
            <tr>
              <th>Contact phone number</th>
              <td>{device.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Assigned.propTypes = {
  device: PropTypes.object.isRequired
}
