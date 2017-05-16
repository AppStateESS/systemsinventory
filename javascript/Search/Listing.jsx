'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeviceRow from './DeviceRow.jsx'

export default class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getRows = this.getTable.bind(this)
  }

  getTable() {
    let table
    let rows
    if (this.props.rows === null) {
      return <div></div>
    } else {
      rows = this.props.rows.map(function(val, key){
        return <DeviceRow value={val} key={key} />
      }.bind(this))
      table = (
        <table className="table table-striped">
          <tbody>
          <tr>
            <th>Device type</th>
            <th>Physical ID</th>
            <th>Model</th>
            <th>Location /<br />Room number</th>
            <th>Username</th>
            <th>Department</th>
          </tr>
          {rows}
          </tbody>
        </table>
      )
      return table
    }
  }

  render() {
    return(
      <div>
          {this.getTable()}
      </div>
    )
  }
}

Listing.propTypes = {
  rows : PropTypes.array
}
