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
          <th>Manufacturer</th>
          <td>{device.manufacturer}</td>
        </tr>
        <tr>
          <th>Model</th>
          <td>{device.model}</td>
        </tr>
        <tr>
          <th>
            Exclude from Rotation
          </th>
          <td>{device.rotation === 1
              ? 'Yes'
              : 'No'}
          </td>
        </tr>
      </tbody>
    )
  }
}

TimeClock.propTypes = {
  device: PropTypes.object.isRequired
}
