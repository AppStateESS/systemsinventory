'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../DeviceForms/Base.jsx'

export default class Ipad extends Base {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            {this.select('system_usage')}
          </div>
          <div className="col-sm-4">
            {this.inputField('apple_id', 'Tablet account')}
          </div>
          <div className="col-sm-4">
            {this.inputField('primary_ip', 'Primary IP')}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            {this.inputField('first_name')}
          </div>
          <div className="col-sm-3">
            {this.inputField('last_name')}
          </div>
          <div className="col-sm-3">
            {this.inputField('username')}
          </div>
          <div className="col-sm-3">
            {this.inputField('phone')}
          </div>
        </div>
      </div>
    )
  }
}

Ipad.propTypes = {
  device: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}
