'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TimeClock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {device} = this.props
    return (
      <tbody>
        <tr>
          <th>Player manufacturer</th>
          <td>{device.player_manufacturer}</td>
        </tr>
        <tr>
          <th>Screen manufacturer</th>
          <td>{device.screen_manufacturer}</td>
        </tr>
        <tr>
          <th>Model</th>
          <td>{device.model}</td>
        </tr>
        <tr>
          <th>Processor</th>
          <td>{device.processor}</td>
        </tr>
        <tr>
          <th>RAM</th>
          <td>{device.ram}</td>
        </tr>
        <tr>
          <th>Screen size</th>
          <td>{device.screen_size}</td>
        </tr>
      </tbody>
    )
  }
}

TimeClock.propTypes = {
  device: PropTypes.object.isRequired
}
