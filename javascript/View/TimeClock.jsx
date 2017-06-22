'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TimeClock extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tbody>
        <tr>
          <th></th>
          <td>TimeClock</td>
        </tr>
      </tbody>
    )
  }
}

TimeClock.propTypes = {
  device: PropTypes.object.isRequired
}
