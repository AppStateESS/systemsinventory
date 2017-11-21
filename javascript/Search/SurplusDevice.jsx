'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ViewDevice from '../View/ViewDevice.jsx'

export default class SurplusDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Are you sure you want to surplus this device?<br />All assignment data will be cleared.</h2>
        <button
          className="marginRight btn-lg btn btn-success"
          onClick={this.props.surplus}>Yes, I am sure</button>
        <button className="btn btn-danger btn-lg" onClick={this.props.close}>No, get me out of here</button>
        <hr/>
        <ViewDevice device={this.props.device}/>
      </div>
    )
  }
}

SurplusDevice.propTypes = {
  surplus: PropTypes.func.isRequired,
  device: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
}
