'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Printer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody>
        <tr>
          <th></th>
          <td>Printer</td>
        </tr>
      </tbody>
    )
  }
}

Printer.propTypes = {
  device: PropTypes.object.isRequired
}
