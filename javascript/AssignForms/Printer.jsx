'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../DeviceForms/Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Printer extends Base {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device} = this.props
    let placeholder
    if (!device.network) {
      placeholder = 'Printer is not networked'
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-3 col-sm-4">
            {this.inputField('first_name')}
          </div>
          <div className="col-md-3 col-sm-4">
            {this.inputField('last_name')}
          </div>
          <div className="col-md-3 col-sm-4">
            {this.inputField('username')}
          </div>
          <div className="col-md-3 col-sm-4">
            {this.inputField('phone')}
          </div>
          <div className="col-md-3 col-sm-4">
            {this.inputField('primary_ip', 'Primary IP', !device.network, placeholder)}
          </div>
        </div>
      </div>
    )
  }
}

Printer.propTypes = {
  device: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}
