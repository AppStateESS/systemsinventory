'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeviceRow from './DeviceRow.jsx'
import Sort from './Sort.jsx'
import TooltipSearch from './TooltipSearch.jsx'
import TooltipSelectSearch from './TooltipSelectSearch.jsx'

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
    sort.usernameSort = <Sort
      direction={this.currentDirection('username')}
      handleClick={this.props.toggleSort.bind(null, 'username')}/>
    sort.departmentSort = <Sort
      direction={this.currentDirection('department')}
      handleClick={this.props.toggleSort.bind(null, 'department')}/>
    return sort
  }

  search() {
    const {filters, update, updateSelect} = this.props
    let search = {}
    search.physicalSearch = <TooltipSearch
      value={filters.physicalId}
      change={update.bind(null, 'physicalId')}/>
    search.modelSearch = <TooltipSearch value={filters.model} change={update.bind(null, 'model')}/>
    search.locationSearch = <TooltipSelectSearch
      value={filters.location}
      options={this.props.options.locations}
      change={updateSelect.bind(null, 'location')}/>
    search.usernameSearch = <TooltipSearch value={filters.username} change={update.bind(null, 'username')}/>
    search.departmentSearch = <TooltipSelectSearch
      value={filters.department}
      options={this.props.options.departments}
      change={updateSelect.bind(null, 'department')}/>
    return search
  }

  highlight(test) {
    return test
      ? 'bg-success'
      : null
  }

  getTable() {
    let table
    let rows
    const {filters} = this.props

    const {
      physicalSort,
      modelSort,
      locationSort,
      usernameSort,
      departmentSort
    } = this.sort()
    const {physicalSearch, modelSearch, locationSearch, usernameSearch, departmentSearch} = this.search()

    if (this.props.rows === null || this.props.rows.length === 0) {
      rows = <tr><td colSpan="7">No rows found. Change your search criteria.</td></tr>
    } else {
      rows = this.props.rows.map(function (val, key) {
        return <DeviceRow
          showOverlay={this.props.showOverlay.bind(null, val.id)}
          value={val}
          key={key}/>
      }.bind(this))
    }
    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr className="search-header">
              <th>Type</th>
              <th className={this.highlight(filters.physicalId.length > 0)}>Physical ID&nbsp;&nbsp;<span>{physicalSort}&nbsp;{physicalSearch}</span>
              </th>
              <th className={this.highlight(filters.model.length > 0)}>Model&nbsp;&nbsp;<span>{modelSort}&nbsp;{modelSearch}</span>
              </th>
              <th className={this.highlight(filters.location > 0)}>Location&nbsp;&nbsp;<span>{locationSort}&nbsp;{locationSearch}</span>
              </th>
              <th className={this.highlight(filters.username.length > 0)}>Username&nbsp;&nbsp;<span>{usernameSort}&nbsp;{usernameSearch}</span>
              </th>
              <th className={this.highlight(filters.department > 0)}>Department&nbsp;&nbsp;<span>{departmentSort}&nbsp;{departmentSearch}</span>
              </th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    )
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
  update: PropTypes.func,
  updateSelect: PropTypes.func,
  options: PropTypes.object
}
