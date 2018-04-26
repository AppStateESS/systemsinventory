'use strict'
import React from 'react'
import Base from './Base.jsx'
import InputField from '../FormMixin/InputField.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'
import SelectFilter from '../FormMixin/SelectFilter.jsx'
import empty from '../Mixin/Empty.js'

export default class Laptop extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'pc'
  }

  render() {
    const {device, update, options} = this.props
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
            {this.inputField('manufacturer')}
          </div>
          <div className="col-sm-6">
            {this.inputField('model')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('processor', null, false, 'Intel core 5')}
          </div>
          <div className="col-sm-4">
            {this.inputField('video_card', null, false, 'Nvidia, ATI, Onboard')}
          </div>
          <div className="col-sm-4">
            {this.inputField('os', 'Operating system', false, 'Windows 10, Mac OS, Linux')}
            <SelectFilter
              value={device.os}
              options={options.os}
              update={update.bind(null, 'os')}
              name="os"/>
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
            {this.inputField('primary_monitor', 'Screen size')}
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
