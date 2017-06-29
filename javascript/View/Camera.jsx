'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Camera extends Component {
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
          <th>Resolution in megapixels</th>
          <td>{device.megapixels}</td>
        </tr>
        <tr>
          <th>SD Card support
          </th>
          <td>{device.sd_support === 1
              ? 'Yes'
              : 'No'}
          </td>
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
            Exterior installation
          </th>
          <td>{device.exterior === 1
              ? 'Yes'
              : 'No'}
          </td>
        </tr>
        <tr>
          <th>
            Covert installation
          </th>
          <td>{device.covert === 1
              ? 'Yes'
              : 'No'}
          </td>
        </tr>
        <tr>
          <th>
            Currently enabled
          </th>
          <td>{device.is_on === 1
              ? 'Yes'
              : 'No'}
          </td>
        </tr>
      </tbody>
    )
  }
}

Camera.propTypes = {
  device: PropTypes.object.isRequired
}
