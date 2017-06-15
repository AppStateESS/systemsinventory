'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeviceSummary from '../Mixin/DeviceSummary.jsx'

export default class DeleteDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Are you sure you want to delete this device?</h2>
        <button className="marginRight btn-lg btn btn-success" onClick={this.props.delete}>Yes, I am sure</button>
        <button className="btn btn-danger btn-lg" onClick={this.props.close}>No, get me out of here</button>
        <hr />
        <DeviceSummary device={this.props.device}/>
      </div>
    )
  }
}

DeleteDevice.propTypes = {
  device: PropTypes.object,
  delete: PropTypes.func,
  close: PropTypes.func
}
