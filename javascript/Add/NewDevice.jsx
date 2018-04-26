import React, {Component} from 'react'
import DeviceForm from '../DeviceForm/DeviceForm.jsx'
import moment from 'moment'

/* global jsonFilters */

export default class NewDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: {
        device_type_id: 1,
        purchase_date: moment().format('YYYY-MM-DD')
      }
    }
    this.save = this.save.bind(this)
    this.updateDeviceValue = this.updateDeviceValue.bind(this)
    this.save = this.save.bind(this)
  }

  updateDeviceValue(varname, value) {
    if (typeof value === 'object') {
      value = value.target.value
    }
    let device = this.state.device
    device[varname] = value
    this.setState({device: device})
  }

  save() {
    console.log(this.state.device)
  }

  render() {
    const deviceList = [
      {
        value: 1,
        label: 'PC'
      }, {
        value: 3,
        label: 'iPad'
      }, {
        value: 4,
        label: 'Printer'
      }, {
        value: 5,
        label: 'Camera'
      }, {
        value: 6,
        label: 'Digital sign'
      }, {
        value: 7,
        label: 'Clock'
      }, {
        value: 8,
        label: 'Laptop'
      }
    ]
    let buttonClass
    let deviceButtons = deviceList.map(function (value, key) {
      buttonClass = "btn btn-default"
      if (this.state.device.device_type_id == value.value) {
        buttonClass = "btn btn-default active"
      }
      return (
        <button
          key={key}
          type="button"
          onClick={this.updateDeviceValue.bind(this, 'device_type_id', value.value)}
          className={buttonClass}>{value.label}</button>
      )
    }.bind(this))

    const selectDevice = (
      <div className="btn-group" role="group">
        {deviceButtons}
      </div>
    )

    return (
      <div>
        <div className="text-center">{selectDevice}</div>
        <hr/>
        <DeviceForm
          options={jsonFilters}
          update={this.updateDeviceValue}
          device={this.state.device}
          save={this.save}/>
      </div>
    )
  }
}

NewDevice.propTypes = {}
