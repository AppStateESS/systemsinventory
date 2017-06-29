'use strict'
import React from 'react'
import Base from './Base.jsx'
import PropTypes from 'prop-types'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Ipad extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'ipad'
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('mac', 'MAC address', false, 'XX:XX:XX:XX:XX:XX')}
          </div>
          <div className="col-sm-4">
            {this.inputField('hd_size', 'Memory', false,'32GB, 64GB')}
          </div>
          <div className="col-sm-4">
            {this.inputField('generation', 'Model/Generation', false, 'Ipad Mini Pro, Samsung Galaxy, etc.')}
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
