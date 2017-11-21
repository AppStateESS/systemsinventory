import React from 'react'
import DeviceForm from '../Shared/DeviceForm.jsx'
import moment from 'moment'
import FormBase from '../Shared/FormBase.jsx'

/* global $ */

export default class Add extends FormBase {
  constructor(props) {
    super(props)
    this.state = {
      device: {
        id: 0,
        device_type_id: 1,
        purchase_date: moment().format('YYYY-MM-DD'),
        status: 0
      }
    }
    this.save = this.save.bind(this)
  }

  loadDevice(id) {
    $.getJSON('./systemsinventory/system/getDetails', {device_id: id}).done(function (data) {
      this.setState({device: data})
    }.bind(this))
  }

  save(device) {
    $.post('./systemsinventory/system/', device, null, 'json').done(function () {
      window.location.href = './systemsinventory/'
    }.bind(this)).fail(function () {
    })
  }

  render() {
    return (
      <div>
        <h2>Create device</h2>
        <DeviceForm save={this.save} update={this.updateDeviceValue} device={this.state.device}/>
      </div>
    )
  }
}
