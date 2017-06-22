'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DigitalSign extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody>
        <tr>
          <th></th>
          <td>DigitalSign</td>
        </tr>
      </tbody>
    )
  }
}

DigitalSign.propTypes = {
  device: PropTypes.object.isRequired
}
