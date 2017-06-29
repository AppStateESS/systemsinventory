'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base.jsx'

export default class Clock extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'clock'
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('mac', 'MAC address', false, 'XX:XX:XX:XX:XX:XX')}
          </div>
          <div className="col-sm-4">
            {this.inputField('manufacturer')}
          </div>
          <div className="col-sm-4">
            {this.inputField('model')}
          </div>
        </div>
      </div>
    )
  }
}

Clock.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  selectUpdate: PropTypes.func
}
