'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeviceRow from './DeviceRow.jsx'
import Sort from './Sort.jsx'
import TooltipSearch from './TooltipSearch.jsx'

export default class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOverlay: false,
      test: ''
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
    search.physicalSearch = <TooltipSearch
      value={this.props.filters.physicalId}
      change={this.props.update.bind(null, 'physicalId')}/>
    search.modelSearch = <TooltipSearch
      value={this.props.filters.model}
      change={this.props.update.bind(null, 'model')}/>
    search.locationSearch = <i className="fa fa-search"></i>
    search.usernameSearch = <TooltipSearch
      value={this.props.filters.username}
      change={this.props.update.bind(null, 'username')}/>
    search.departmentSearch = <i className="fa fa-search"></i>
    return search
  }

  updateTest(e) {
    this.setState({test: e.target.value})
  }

  getTable() {
    let table
    let rows
    const {filters} = this.props

    const {
      physicalSort,
      modelSort,
      locationSort,
      roomSort,
      usernameSort,
      departmentSort
    } = this.sort()
    const {physicalSearch, modelSearch, locationSearch, usernameSearch, departmentSearch} = this.search()

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
                <th
                  className={filters.physicalId.length > 0
                  ? 'bg-success'
                  : null}>Physical ID&nbsp;&nbsp;<span>{physicalSort}&nbsp;{physicalSearch}</span>
                </th>
                <th
                  className={filters.model.length > 0
                  ? 'bg-success'
                  : null}>Model&nbsp;&nbsp;<span>{modelSort}&nbsp;{modelSearch}</span>
                </th>
                <th>Location&nbsp;&nbsp;<span>{locationSort}&nbsp;{locationSearch}</span>
                </th>
                <th>Room&nbsp;&nbsp;{roomSort}</th>
                <th
                  className={filters.username.length > 0
                  ? 'bg-success'
                  : null}>Username&nbsp;&nbsp;<span>{usernameSort}&nbsp;{usernameSearch}</span>
                </th>
                <th>Department&nbsp;&nbsp;<span>{departmentSort}&nbsp;{departmentSearch}</span>
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
  sort: PropTypes.object,
  update: PropTypes.func
}
