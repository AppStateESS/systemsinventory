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
    const deviceList = [
      {
        value: 1,
        label: 'PC'
      }, {
        value: 8,
        label: 'Laptop'
      }, {
        value: 2,
        label: 'Server'
      }, {
        value: 3,
        label: 'Tablet'
      }, {
        value: 4,
        label: 'Printer'
      }, {
        value: 5,
        label: 'Camera'
      }, {
        value: 6,
        label: 'Digital sign'
      }, {
        value: 7,
        label: 'Clock'
      }
    ]
    let cn
    const allCn  = this.props.active[0] === 'all' ? 'btn btn-primary' : 'btn btn-default'
    let buttons = deviceList.map(function (value, key) {
      if ($.inArray(value.value, this.props.active) > -1) {
        cn = 'btn btn-primary'
      } else {
        cn = 'btn btn-default'
      }

      return <button key={key}
        className={cn}
        onClick={this.props.update.bind(this, value.value)}>{value.label}</button>
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
  active: PropTypes.array
}
