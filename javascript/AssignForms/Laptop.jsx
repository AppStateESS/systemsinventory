'use strict'
import React from 'react'
import Base from '../DeviceForms/Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Laptop extends Base {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('primary_ip', 'Primary IP')}
          </div>
          <div className="col-sm-4">
            {this.inputField('secondary_ip', 'Secondary IP')}
          </div>
          <div className="col-sm-4">
            {this.select('vlan', 'VLAN')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.select('system_usage')}
          </div>
          <div className="col-sm-4">
            {this.inputField('first_name')}
          </div>
          <div className="col-sm-4">
            {this.inputField('last_name')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('username')}
          </div>
          <div className="col-sm-6">
            {this.inputField('phone')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.dual_monitor === 1}
              handle={update.bind(null, 'dual_monitor', device.dual_monitor === 1
              ? 0
              : 1)}
              label="Dual monitor"/> {this.inputField('secondary_monitor', 'Secondary monitor size', device.dual_monitor === 0)}
          </div>
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.smart_room === 1}
              handle={update.bind(null, 'smart_room', device.smart_room === 1
              ? 0
              : 1)}
              label="Smart room"/>
          </div>
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.check_in === 1}
              handle={update.bind(null, 'check_in', device.check_in === 1
              ? 0
              : 1)}
              label="Check in"/>
          </div>
        </div>
      </div>
    )
  }
}
