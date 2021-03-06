'use strict'
import React from 'react'
import Base from '../DeviceForms/Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class PC extends Base {
  constructor(props) {
    super(props)
    this.updateName = this.updateName.bind(this)    
  }

  updateName(name){
      this.props.update('first_name', name.firstName)
      this.props.update('last_name', name.lastName)
      this.props.update('username', name.userName)
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
            {this.userSearch('username', 'Username')}
          </div>          
          <div className="col-sm-4">
            {this.inputField('first_name', 'First Name')}
          </div>
          <div className="col-sm-4">
            {this.inputField('last_name', 'Last Name')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {this.select('system_usage')}
          </div>
          <div className="col-sm-6">
            {this.inputField('phone')}
          </div>
        </div>
        <div className="row">
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
