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
            {this.inputField('processor', null, false, 'Intel core 5')}
          </div>
          <div className="col-sm-4">
            {this.inputField('video_card', null, false, 'Nvidia, ATI')}
          </div>
          <div className="col-sm-4">
            {this.inputField('os', 'Operating system')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('ram', 'RAM', false, 'in GB')}
          </div>
          <div className="col-sm-4">
            {this.inputField('hd_size', 'Hard drive', false, 'GB or TB')}
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
          </div>
        </div>
      </div>
    )
  }
}
