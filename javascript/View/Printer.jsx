'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Printer extends Component {
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
          <th>Toner cartridge</th>
          <td>{device.toner_cartridge}</td>
        </tr>
        <tr>
          <th>Color</th>
          <td>{device.color === 1 ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <th>Duplex</th>
          <td>{device.duplex === 1 ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <th>Networked</th>
          <td>{device.network === 1 ? 'Yes' : 'No'}</td>
        </tr>
      </tbody>
    )
  }
}

Printer.propTypes = {
  device: PropTypes.object.isRequired
}
