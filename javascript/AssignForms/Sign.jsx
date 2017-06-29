'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../DeviceForms/Base.jsx'

export default class Sign extends Base {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('primary_ip', 'Primary IP')}
          </div>
          <div className="col-sm-6">
            {this.select('vlan', 'VLAN')}
          </div>
        </div>
      </div>
    )
  }
}

Sign.propTypes = {
  device: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}
