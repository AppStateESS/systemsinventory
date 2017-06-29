'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DigitalSign extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {device} = this.props
    return (
      <tbody>
        <tr>
          <th>Model</th>
          <td>{device.model}</td>
        </tr>
      </tbody>
    )
  }
}

DigitalSign.propTypes = {
  device: PropTypes.object.isRequired
}
