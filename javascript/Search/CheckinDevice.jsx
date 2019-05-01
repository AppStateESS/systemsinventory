'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CheckinDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Do you wish to check this device in?</h2>
        <button
          className="marginRight btn-lg btn btn-success"
          onClick={this.props.checkin}>Yes, I am sure</button>
        <button className="btn btn-danger btn-lg" onClick={this.props.close}>No, get me out of here</button>
      </div>
    )
  }
}

CheckinDevice.propTypes = {
  device: PropTypes.object,
  checkin: PropTypes.func,
  close: PropTypes.func
}