'use strict'
import React from 'react'
import Base from './Base.jsx'
import PropTypes from 'prop-types'
import InputField from '../FormMixin/InputField.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Ipad extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'ipad'
  }

  render() {
    const {device, update, options} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('mac', 'MAC address', false, 'XX:XX:XX:XX:XX:XX')}
          </div>
          <div className="col-sm-4">
            {this.inputField('hd_size', 'Memory', false,'32MB, 64MB')}
          </div>
          <div className="col-sm-4">
            {this.inputField('generation', null, false, 'Pro, mini, air, 4th')}
          </div>
        </div>
        <BigCheckbox
          checked={device.protective_case === 1}
          handle={update.bind(null, 'protective_case', device.protective_case === 1
          ? 0
          : 1)}
          label="Protective case"/>
      </div>
    )
  }
}

Ipad.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  selectUpdate: PropTypes.func
}
