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
        <tr>
            <th>Screen Manufacturer</th>
            <td>{device.screen_manufacturer}</td>
        </tr>
        <tr>
            <th>Screen size</th>
            <td>{device.screen_size}</td>
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
            <th>Hard drive</th>
            <td>{device.hd_size}</td>
        </tr>
        <tr>
            <th>Player manufacturer</th>
            <td>{device.manufacturer}</td>
        </tr>
        <tr>
            <th>Content creator</th>
            <td>{device.content_creator}</td>
        </tr>
        <tr>
          <th>
            High Definition
          </th>
          <td>{device.hi_def === 1
              ? 'Yes'
              : 'No'}
          </td>
        </tr>
        <tr>
          <th>
            Exclude from rotation
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

DigitalSign.propTypes = {
  device: PropTypes.object.isRequired
}
