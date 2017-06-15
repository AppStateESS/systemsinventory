'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class UnassignDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Do you wish to unassign this device from its user and/or location?</h2>
        <button
          className="marginRight btn-lg btn btn-success"
          onClick={this.props.unassign}>Yes, I am sure</button>
        <button className="btn btn-danger btn-lg" onClick={this.props.close}>No, get me out of here</button>
      </div>
    )
  }
}

UnassignDevice.propTypes = {
  device: PropTypes.object,
  unassign: PropTypes.func,
  close: PropTypes.func
}
