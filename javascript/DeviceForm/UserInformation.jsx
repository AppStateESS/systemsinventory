'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Device from './Device.jsx'

export default class UserInformation extends Device {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <fieldset>
        <legend>
          User information
        </legend>
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
            {this.inputField('phone', 'Phone number')}
          </div>
        </div>
      </fieldset>
    )
  }
}

UserInformation.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func
}
