'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Device from './Device.jsx'

export default class Network extends Device {
  render() {
    const {device, update, options} = this.props
    let secondIp
    let secondMac
    let vlan
    if (this.props.secondIp) {
      secondIp = this.inputField('secondary_ip', 'Secondary IP', false, 'XXX.XXX.XXX.XXX')
    }

    if (this.props.secondMac) {
      secondMac = this.inputField('mac2', 'Secondary MAC address', false, 'XX:XX:XX:XX:XX:XX')
    }

    if (this.props.vlan) {
      vlan = this.select('vlan', 'VLAN')
    }
    return (
      <fieldset>
        <legend>Network</legend>
        <div className="row">
          <div className="col-sm-4">
            {this.inputField('mac', 'MAC address (wired)', false, 'XX:XX:XX:XX:XX:XX')}
            {secondMac}
          </div>
          <div className="col-sm-4">
            {this.inputField('primary_ip', 'Primary IP Address', false, 'XXX.XXX.XXX.XXX')}
            {secondIp}
          </div>
          <div className="col-sm-4">
            {vlan}
          </div>
        </div>
      </fieldset>
    )
  }
}

Network.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  selectUpdate: PropTypes.func,
  secondMac: PropTypes.bool,
  secondIp: PropTypes.bool,
  vlan: PropTypes.bool
}

Network.defaultProps = {
  secondMac: false,
  secondIp: false,
  vlan: false
}
