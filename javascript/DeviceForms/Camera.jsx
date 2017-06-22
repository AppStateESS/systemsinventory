'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Camera extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'camera'
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-6 col-md-3">
            {this.inputField('mac', 'MAC address', false, 'XX:XX:XX:XX:XX:XX')}
          </div>
          <div className="col-sm-6 col-md-3">
            {this.inputField('model')}
          </div>
          <div className="col-sm-6 col-md-3">
            {this.inputField('manufacturer')}
          </div>
          <div className="col-sm-6 col-md-3">
            {this.inputField('megapixels')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <BigCheckbox
              checked={device.hi_def === 1}
              handle={update.bind(null, 'hi_def', device.hi_def === 1
              ? 0
              : 1)}
              label="High definition"/>
          </div>
          <div className="col-sm-6">
            <div>
              <BigCheckbox
                checked={device.sd_support === 1}
                handle={update.bind(null, 'sd_support', device.sd_support === 1
                ? 0
                : 1)}
                label="SD Card support"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Camera.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func
}
