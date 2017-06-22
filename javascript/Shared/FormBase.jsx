'use strict'
import React, {Component} from 'react'
import moment from 'moment'

export default class FormBase extends Component {
  constructor(props) {
    super(props)
    this.errors = []
    this.state = {
      device: {
        device_type_id: 1,
        purchase_date: moment().format('YYYY-MM-DD'),
        status: 0
      }
    }
    this.updateDeviceValue = this.updateDeviceValue.bind(this)
  }

  updateDeviceValue(varname, value) {
    if (value === null) {
      value = ''
    }
    if (typeof value === 'object') {
      value = value.target.value
    }
    let device = this.state.device
    device[varname] = value
    this.setState({device: device})
  }

  render() {
    return (
      <div></div>
    )
  }
}

FormBase.propTypes = {}
