'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import acceptableFields from "../Config/acceptableFields.js"
import empty from '../Mixin/Empty.js'

export default class DeviceSummary extends Component {
  constructor(props)
  {
    super(props)
    this.state = {}
  }

  render() {
    const {device} = this.props
    let rows = Object.keys(device).map(function (value, key) {
      if (acceptableFields.indexOf(value) !== -1 && !empty(device[value])) {
        return (
          <tr key={key}>
            <th>{value}</th>
            <td>{device[value]}</td>
          </tr>
        )
      }
    })
    return (
      <div>
        <table className="table table-striped">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

DeviceSummary.propTypes = {
  device: PropTypes.object
}
