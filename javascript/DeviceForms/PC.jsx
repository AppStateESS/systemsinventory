'use strict'
import React from 'react'
import Base from './Base.jsx'
import InputField from '../FormMixin/InputField.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'
import SelectFilter from '../FormMixin/SelectFilter.jsx'
import empty from '../Mixin/Empty.js'

export default class PC extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'pc'
  }

  render() {
    const {device, update, options} = this.props
    let disabled = this.canEdit()
    let primaryIP,secondaryIP,vlan = null
    if(this.props.edit){
        primaryIP = this.inputField('primary_ip', 'Primary IP')
        secondaryIP = this.inputField('secondary_ip', 'Secondary IP')
        vlan = this.select('vlan', 'VLAN') 
   }
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('mac', 'MAC address (wired)', disabled, 'XX:XX:XX:XX:XX:XX')}        
          </div>
          <div className="col-sm-6">
            {this.inputField('mac2', 'Secondary MAC address', disabled, 'XX:XX:XX:XX:XX:XX')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('manufacturer', 'Manufacturer', disabled)}
          </div>
          <div className="col-sm-6">
            {this.inputField('model', 'Model', disabled)}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {primaryIP}
          </div>
          <div className="col-sm-4">
            {secondaryIP}
          </div>
          <div className="col-sm-4">
            {vlan}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('processor', null, disabled, 'Intel core 5')}
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
            {this.inputField('primary_monitor', 'Primary monitor size')}
          </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
                {this.inputField('secondary_monitor', 'Secondary monitor size', device.dual_monitor === 0)}
            </div>
            <div className="col-sm-4">
                {this.inputField('tertiary_monitor', 'Tertiary monitor size', false)}
            </div>
            <div className="col-sm-4">
                {this.inputField('secondary_video_card', 'Secondary Video Card', false)}
            </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.dual_monitor === 1}
              handle={update.bind(null, 'dual_monitor', device.dual_monitor === 1
              ? 0
              : 1)}
              label="Dual monitor"/> 
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
                label="Stand"/>
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
        </div>
      </div>
    )
  }
}
