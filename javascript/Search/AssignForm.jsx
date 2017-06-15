'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../DeviceForms/Base.jsx'
import Device from '../Mixin/Device.js'

export default class AssignForm extends Base {
  constructor(props) {
    super(props)
    this.errors = []
    this.state = {}
  }

  render() {
    const {device, update} = this.props
    let username
    let firstName
    let lastName
    let phone
    let room
    let systemUsage
    let secondaryIp
    let vlan
    switch (device.device_type_id) {
      case 1:
      case 2:
        secondaryIp = this.inputField('secondary_ip', 'Secondary IP');
        vlan = this.select('vlan', 'VLAN');
        // falls through
      case 3:
        systemUsage = this.select('system_usage')
        // falls through
      case 4:
        if (device.status === '1') {
          username = this.inputField('username')
          firstName = this.inputField('first_name')
          lastName = this.inputField('last_name')
          phone = this.inputField('phone')
        }
        room = this.inputField('room_number', 'Office/Location');
        break
      case 6:
      case 7:
        vlan = this.select('vlan', 'VLAN')
        // falls through
      case 5:
        room = this.inputField('room_number', 'Location');
        break
    }
    return (
      <div>
        <div>
          <label><input
            type="radio"
            name="status"
            value="1"
            checked={device.status === '1'}
            onChange={update.bind(null, 'status', '1')}/>Assign to person</label><br/>
          <label><input
            type="radio"
            name="status"
            value="2"
            checked={device.status === '2'}
            onChange={update.bind(null, 'status', '2')}/>Assign to location</label>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            {this.select('department_id', 'Department', 'departments')}
          </div>
          <div className="col-sm-4">
            {this.select('location_id', 'Building', 'locations')}
          </div>
          <div className="col-sm-4">
            {room}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('primary_ip', 'Primary IP')}
          </div>
          <div className="col-sm-4">
            {vlan}
          </div>
          <div className="col-sm-4">
            {secondaryIp}
          </div>
        </div>
        {systemUsage}
        <div className="row">
          <div className="col-sm-6">
            {firstName}
          </div>
          <div className="col-sm-6">
            {lastName}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {username}
          </div>
          <div className="col-sm-6">
            {phone}
          </div>
        </div>
        <label>Notes</label>
        <div className="row">
          <div className="col-sm-12">
            <textarea
              className="form-control"
              value={device.notes === null
              ? ''
              : device.notes}
              onChange={this.props.update.bind(null, 'notes')}/>
          </div>
        </div>
        <button
          className="marginTop btn btn-primary"
          onClick={this.props.assign}
          disabled={!Device.checkForErrors(device, this.errors)}>Assign device</button>
      </div>
    )
  }
}

AssignForm.propTypes = {
  assign: PropTypes.func
}
