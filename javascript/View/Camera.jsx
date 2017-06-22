'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Camera extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody>
        <tr>
          <th></th>
          <td>Camera</td>
        </tr>
      </tbody>
    )
  }
}

Camera.propTypes = {
  device: PropTypes.object.isRequired
}
