'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Ipad extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody>
        <tr>
          <th></th>
          <td>Ipad</td>
        </tr>
      </tbody>
    )
  }
}

Ipad.propTypes = {
  device: PropTypes.object.isRequired
}
