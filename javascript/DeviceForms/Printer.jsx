'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base.jsx'
import BigCheckbox from '../FormMixin/BigCheckbox.jsx'

export default class Printer extends Base {
  constructor(props) {
    super(props)
    this.deviceType = 'printer'
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('model')}
          </div>
          <div className="col-sm-4">
            {this.inputField('manufacturer')}
          </div>
          <div className="col-sm-4">
            {this.inputField('toner_cartridge')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.color === 1}
              handle={update.bind(null, 'color', device.color === 1
              ? 0
              : 1)}
              label="Color"/>
          </div>
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.duplex === 1}
              handle={update.bind(null, 'duplex', device.duplex === 1
              ? 0
              : 1)}
              label="Duplex"/>
          </div>
          <div className="col-sm-4">
            <BigCheckbox
              checked={device.network === 1}
              handle={update.bind(null, 'network', device.network === 1
              ? 0
              : 1)}
              label="Network"/>
          </div>
        </div>
      </div>
    )
  }
}

Printer.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func
}
