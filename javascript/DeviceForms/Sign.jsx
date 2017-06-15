'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Sign extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'sign'
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            {this.inputField('mac', 'MAC address')}
          </div>
          <div className="col-sm-3">
            {this.inputField('model')}
          </div>
          <div className="col-sm-3">
            {this.inputField('screen_manufacturer')}
          </div>
          <div className="col-sm-3">
            {this.inputField('player_manufacturer')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            {this.inputField('screen_size')}
          </div>
          <div className="col-sm-3">
            {this.inputField('processor')}
          </div>
          <div className="col-sm-3">
            {this.inputField('ram', 'RAM')}
          </div>
          <div className="col-sm-3">
            {this.inputField('hd_size')}
          </div>
        </div>
        <BigCheckbox
          checked={device.hi_def === 1}
          handle={update.bind(null, 'hi_def', device.hi_def === 1
          ? 0
          : 1)}
          label="High Definition"/>
      </div>
    )
  }
}

Sign.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object
}
