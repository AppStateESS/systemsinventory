'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../Mixin/InputField.jsx'
import SelectFilter from './SelectFilter.jsx'

export default class DeviceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, options} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <fieldset>
              <legend>Identification</legend>
              <InputField
                name="physical_id"
                value={device.physical_id}
                required={true}
                label="Physical Id"/>
              <InputField name="model" value={device.model} required={true} label="Model"/>
              <InputField name="mac" value={device.mac} required={true} label="MAC address"/>
              <InputField name="mac2" value={device.mac2} label="Second MAC address"/>
              <InputField
                name="manufacturer"
                value={device.manufacturer}
                label="Manufacturer"/>
            </fieldset>
            <fieldset>
              <legend>Specifications</legend>
            </fieldset>
            <InputField name="processor" value={device.processor} label="Processor"/>
            <InputField name="first_name" value={device.first_name} label="First name"/>
            <InputField name="last_name" value={device.last_name} label="Last name"/>
            <InputField name="hd_size" value={device.hd_size} label="Hard drive"/>
            <InputField name="ram" value={device.ram} label="RAM"/>
          </div>
          <div className="col-sm-6">
            <fieldset>
              <legend>Location</legend>
              <SelectFilter
                label="Department"
                value={device.department_id}
                options={options.departments}
                update={this.props.update.bind(null, 'department_id')}
                name="department_id"/>
              <SelectFilter
                label="Location"
                value={device.location_id}
                options={options.locations}
                update={this.props.update.bind(null, 'location_id')}
                name="location_id"/>
              <InputField name="room_number" value={device.room_number} label="Room number"/>
            </fieldset>
            <fieldset>
              <legend>Network</legend>
              <SelectFilter
                label="VLAN"
                value={device.vlan}
                options={options.vlan}
                update={this.props.update.bind(null, 'vlan')}
                name="department_id"/>
              <InputField
                name="primary_ip"
                value={device.primary_ip}
                label="Primary IP Address"/>
              <InputField
                name="secondary_ip"
                value={device.secondary_ip}
                label="Secondary IP Address"/>
            </fieldset>

          </div>
        </div>
      </div>
    )
  }
}

DeviceForm.propTypes = {
  device: PropTypes.object,
  options: PropTypes.object,
  update: PropTypes.func
}
