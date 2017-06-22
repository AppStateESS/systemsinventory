'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

/* global $ */

export default class SystemSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let label
    let cn
    const allCn  = this.props.active[0] === 'all' ? 'btn btn-primary' : 'btn btn-default'
    console.log(this.props.jsonFilters);
    let buttons = this.props.jsonFilters.system_types.map(function (value, key) {
      if ($.inArray(value.value, this.props.active) > -1) {
        cn = 'btn btn-primary'
      } else {
        cn = 'btn btn-default'
      }

      //label = value.label.charAt(0).toUpperCase() + value.label.slice(1)
      return <button key={key}
        className={cn}
        onClick={this.props.update.bind(this, value.value)}>{value.name}</button>
    }.bind(this))
    return (
      <div className="btn-group marginBottom" role="group">
        <button
          className={allCn}
          onClick={this.props.update.bind(this, 'all')}>All</button>
        {buttons}
      </div>
    )
  }
}

SystemSelection.propTypes = {
  update: PropTypes.func,
  jsonFilters: PropTypes.object,
  active: PropTypes.array
}
