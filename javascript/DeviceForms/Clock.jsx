'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Clock extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'clock'
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
            {this.inputField('manufacturer')}
          </div>
          <div className="col-sm-4">
            {this.inputField('model')}
          </div>
        </div>
        <div className='row'>
        <div className='col-sm-4'>
          <BigCheckbox
            checked={device.rotation === 1}
            handle={update.bind(null, 'rotation', device.rotation === 1 ? 0 : 1)}
            label="Exclude from rotation"/>
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
