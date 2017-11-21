'use strict'
import React, {Component} from 'react'
import SelectFilter from '../FormMixin/SelectFilter.jsx'
import InputField from '../FormMixin/InputField.jsx'
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
            name="ipAddress"
            value={this.props.filters.ipAddress}
            label="IP address"
            change={this.update.bind(this, 'ipAddress')}/>
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
  close: PropTypes.func
}
