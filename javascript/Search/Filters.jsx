'use strict'
import React, {Component} from 'react'
import SelectFilter from '../Mixin/SelectFilter.jsx'
import InputField from '../Mixin/InputField.jsx'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Filters extends Component {
  // Search:openModal
  constructor(props) {
    super(props)
    this.updateSelect = this.updateSelect.bind(this)
    this.update = this.update.bind(this)
  }

  updateSelect(varname, value) {
    if (value === null) {
      this.props.update(varname, '')
    } else {
      this.props.update(varname, value.value)
    }
    this.forceUpdate()
  }

  update(varname, e) {
    this.props.update(varname, e.target.value)
    this.forceUpdate()
  }

  formatDate(datenum) {
    return String(moment(datenum * 1000).format('YYYY-MM-DD'))
  }

  render() {
    return (
      <div>
        <div>
          <SelectFilter
            name="department"
            options={this.props.options.departments}
            value={this.props.filters.department}
            update={this.updateSelect.bind(this, 'department')}
            label="Department"/>
          <SelectFilter
            name="location"
            options={this.props.options.locations}
            value={this.props.filters.location}
            update={this.updateSelect.bind(this, 'location')}
            label="Location"/>
          <InputField
            name="physicalId"
            value={this.props.filters.physicalId}
            label="Physical ID"
            change={this.update.bind(this, 'physicalId')}/>
          <InputField
            name="macAddress"
            value={this.props.filters.macAddress}
            label="MAC Address ID"
            change={this.update.bind(this, 'macAddress')}/>
          <InputField
            name="purchaseDate"
            value={this.props.filters.purchaseDate}
            label="Purchase date"
            change={this.update.bind(this, 'purchaseDate')}/>
          <InputField
            name="model"
            value={this.props.filters.model}
            label="Model"
            change={this.update.bind(this, 'model')}/>
          <InputField
            name="ipAddress"
            value={this.props.filters.ipAddress}
            label="IP address"
            change={this.update.bind(this, 'ipAddress')}/>
          <InputField
            name="username"
            value={this.props.filters.username}
            label="Username"
            change={this.update.bind(this, 'username')}/>
        </div>
        <button className="btn btn-default" onClick={this.props.reset}>Reset</button>
        <button className="btn btn-default" onClick={this.props.close}>Close</button>
      </div>
    )
  }
}

Filters.propTypes = {
  filters: PropTypes.object,
  options: PropTypes.object,
  update: PropTypes.func,
  reset: PropTypes.func,
  close : PropTypes.func,
}
