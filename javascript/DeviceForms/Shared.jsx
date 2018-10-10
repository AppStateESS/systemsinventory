'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Base from './Base.jsx'
import DatePicker from 'react-datepicker'
import '../Mixin/react-datepicker.css'

export default class Shared extends Base {
  constructor(props) {
    super(props)
    this.state = {
      profile: 0
    }
    this.updatePurchaseDate = this.updatePurchaseDate.bind(this)
  }

  updatePurchaseDate(purchaseDate) {
    const dateString = purchaseDate.format('YYYY-MM-DD')
    this.props.update('purchase_date', dateString)
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
    let buttonClass

    let deviceButtons = deviceList.map((value, key) => {
      buttonClass = "btn btn-default"
      if (this.props.device.device_type_id == value.value) {
        buttonClass = "btn btn-default active"
      }
      return (
        <button
          key={key}
          type="button"
          onClick={this.props.update.bind(null, 'device_type_id', value.value)}
          className={buttonClass}>{value.label}</button>
      )
    })

    let selectDevice
    if (this.props.device.id === 0) {
      selectDevice = (
          <div className="device-choice">
            <label>Device type:</label>&nbsp;
            <div className="btn-group" role="group">
              {deviceButtons}
            </div>
          </div>
      )
    }

    return (
      <div>
        {selectDevice}
        <div className="row">
          <div className="col-sm-6">
            {this.inputField('physical_id')}
          </div>
          <div className="col-sm-6">
            <label>Purchase date</label>&nbsp;<i className="fa fa-asterisk text-danger"></i><br/>
            <DatePicker
              className="form-control"
              dateFormat="YYYY-MM-DD"
              todayButton="Today"
              showYearDropdown
              onChange={this.updatePurchaseDate.bind(this)}
              selected={moment(this.props.device.purchase_date)}/>
          </div>
        </div>
        <label>Notes</label>
        <textarea
          className="form-control"
          value={this.props.device.notes === null
          ? ''
          : this.props.device.notes}
          onChange={this.props.update.bind(this, 'notes')}/>
      </div>
    )
  }
}

Shared.propTypes = {
  device: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired
}
