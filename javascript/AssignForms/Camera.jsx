'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../DeviceForms/Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Camera extends Base {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            {this.inputField('primary_ip', 'Primary IP')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <BigCheckbox
              checked={device.exterior === 1}
              handle={update.bind(null, 'exterior', device.exterior === 1
              ? 0
              : 1)}
              label="Exterior"/>
          </div>
          <div className="col-sm-3">
            <BigCheckbox
              checked={device.covert === 1}
              handle={update.bind(null, 'covert', device.covert === 1
              ? 0
              : 1)}
              label="Covert"/>
          </div>
          <div className="col-sm-3">
            <BigCheckbox
              checked={device.is_on === 1}
              handle={update.bind(null, 'is_on', device.is_on === 1
              ? 0
              : 1)}
              label="Activated"/>
          </div>
        </div>
      </div>
    )
  }
}

Camera.propTypes = {
  device: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}
