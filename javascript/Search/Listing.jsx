'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeviceRow from './DeviceRow.jsx'
import Sort from './Sort.jsx'

export default class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOverlay: false
    }
    this.getRows = this.getTable.bind(this)
    this.sort = this.sort.bind(this)
    this.search = this.search.bind(this)
  }

  currentDirection(column) {
    return this.props.sort.column === column
      ? this.props.sort.direction
      : 0
  }

  sort() {
    let sort = {}
    sort.physicalSort = <Sort
      direction={this.currentDirection('physical')}
      handleClick={this.props.toggleSort.bind(null, 'physical')}/>
    sort.modelSort = <Sort
      direction={this.currentDirection('model')}
      handleClick={this.props.toggleSort.bind(null, 'model')}/>
    sort.locationSort = <Sort
      direction={this.currentDirection('location')}
      handleClick={this.props.toggleSort.bind(null, 'location')}/>
    sort.roomSort = <Sort
      direction={this.currentDirection('room')}
      handleClick={this.props.toggleSort.bind(null, 'room')}/>
    sort.usernameSort = <Sort
      direction={this.currentDirection('username')}
      handleClick={this.props.toggleSort.bind(null, 'username')}/>
    sort.departmentSort = <Sort
      direction={this.currentDirection('department')}
      handleClick={this.props.toggleSort.bind(null, 'department')}/>
    return sort
  }

  search() {
    const {filters} = this.props
    let search = {}
    search.physicalSearch = <i className="fa fa-search"></i>
    search.modelSearch = <i className="fa fa-search"></i>
    search.locationSearch = <i className="fa fa-search"></i>
    search.roomSearch = <i className="fa fa-search"></i>
    search.usernameSearch = <i className="fa fa-search"></i>
    search.departmentSearch = <i className="fa fa-search"></i>
    return search
  }

  getTable() {
    let table
    let rows

    const {
      physicalSort,
      modelSort,
      locationSort,
      roomSort,
      usernameSort,
      departmentSort
    } = this.sort()
    const {
      physicalSearch,
      modelSearch,
      locationSearch,
      roomSearch,
      usernameSearch,
      departmentSearch
    } = this.search()

    if (this.props.rows === null) {
      return <div></div>
    } else {
      rows = this.props.rows.map(function (val, key) {
        return <DeviceRow
          showOverlay={this.props.showOverlay.bind(null, val.id)}
          value={val}
          key={key}/>
      }.bind(this))
      table = (
        <div>
          <table className="table table-striped">
            <tbody>
              <tr className="search-header">
                <th>Type</th>
                <th>Physical ID<span className="pull-right">{physicalSort}&nbsp;{physicalSearch}</span>
                </th>
                <th>Model<span className="pull-right">{modelSort}&nbsp;{modelSearch}</span>
                </th>
                <th>Location<span className="pull-right">{locationSort}&nbsp;{locationSearch}</span>
                </th>
                <th>Room#<span className="pull-right">{roomSort}&nbsp;{roomSearch}</span>
                </th>
                <th>Username<span className="pull-right">{usernameSort}&nbsp;{usernameSearch}</span>
                </th>
                <th>Department<span className="pull-right">{departmentSort}&nbsp;{departmentSearch}</span>
                </th>
              </tr>
              {rows}
            </tbody>
          </table>
        </div>
      )
      return table
    }
  }

  render() {
    return (
      <div>
        <div>{this.getTable()}</div>
      </div>
    )
  }
}

Listing.propTypes = {
  rows: PropTypes.array,
  showOverlay: PropTypes.func,
  filters: PropTypes.object,
  toggleSort: PropTypes.func,
  sort: PropTypes.object
}
