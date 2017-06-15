'use strict'
import React from 'react'
import Base from './Base.jsx'
import InputField from '../FormMixin/InputField.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'
import empty from '../Mixin/Empty.js'

export default class PC extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'pc'
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('mac', 'MAC address (wired)', false, 'XX:XX:XX:XX:XX:XX')}
          </div>
          <div className="col-sm-6">
            {this.inputField('mac2', 'Secondary MAC address', false, 'XX:XX:XX:XX:XX:XX')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('model')}
          </div>
          <div className="col-sm-6">
            {this.inputField('manufacturer')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('processor')}
          </div>
          <div className="col-sm-4">
            {this.inputField('video_card')}
          </div>
          <div className="col-sm-4">
            {this.inputField('os', 'Operating system')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('ram', 'RAM')}
          </div>
          <div className="col-sm-4">
            {this.inputField('hd_size', 'Hard drive')}
          </div>
          <div className="col-sm-4">
            {this.inputField('primary_monitor', 'Primary monitor size')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>
              <BigCheckbox
                checked={device.battery_backup === 1}
                handle={update.bind(null, 'battery_backup', device.battery_backup === 1
                ? 0
                : 1)}
                label="Battery backup"/>
            </div>
            <div>
              <BigCheckbox
                checked={device.redundant_backup === 1}
                handle={update.bind(null, 'redundant_backup', device.redundant_backup === 1
                ? 0
                : 1)}
                label="Redundant backup"/>
            </div>
            <div>
              <BigCheckbox
                checked={device.rotation === 1}
                handle={update.bind(null, 'rotation', device.rotation === 1
                ? 0
                : 1)}
                label="Exclude from rotation"/>
            </div>
          </div>
          <div className="col-sm-4">
            <div>
              <BigCheckbox
                checked={device.smart_room === 1}
                handle={update.bind(null, 'smart_room', device.smart_room === 1
                ? 0
                : 1)}
                label="Smart room"/>
            </div>
            <div>
              <BigCheckbox
                checked={device.check_in === 1}
                handle={update.bind(null, 'check_in', device.check_in === 1
                ? 0
                : 1)}
                label="Check in"/>
            </div>
            <div>
              <BigCheckbox
                checked={device.is_server === 1}
                handle={update.bind(null, 'is_server', device.is_server === 1
                ? 0
                : 1)}
                label="Is server"/>
            </div>
            <InputField
              disabled={empty(device.is_server)}
              name="server_type"
              placeholder="2u, 4u, towers, etc."
              value={device.server_type}
              label="Server type"
              change={update.bind(null, 'server_type')}/>
          </div>
          <div className="col-sm-4">
            <div>
              <BigCheckbox
                checked={device.touch_screen === 1}
                handle={update.bind(null, 'touch_screen', device.touch_screen === 1
                ? 0
                : 1)}
                label="Touch screen"/>
            </div>
            <div>
              <BigCheckbox
                checked={device.stand === 1}
                handle={update.bind(null, 'stand', device.stand === 1
                ? 0
                : 1)}
                label="Docking stand"/>
            </div>
            <div>
              <BigCheckbox
                checked={device.dual_monitor === 1}
                handle={update.bind(null, 'dual_monitor', device.dual_monitor === 1
                ? 0
                : 1)}
                label="Dual monitor"/>
            </div>
            <InputField
              name="secondary_monitor"
              disabled={device.dual_monitor === 0}
              value={device.secondary_monitor}
              label="Secondary monitor size"
              change={update.bind(null, 'secondary_monitor')}/>
          </div>
        </div>
      </div>
    )
  }
}
