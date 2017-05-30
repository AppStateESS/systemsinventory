'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import './react-datepicker.css'
import Device from './Device.jsx'

export default class Shared extends Device {
  constructor(props) {
    super(props)
    this.state = {}
  }

  updatePurchaseDate(purchaseDate) {
    const dateString = purchaseDate.format('YYYY-MM-DD')
    this.props.update('purchase_date', dateString)
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <fieldset>
          <legend>Basic information</legend>
          <div className="row">
            <div className="col-sm-6">
              <label>Device status</label>
              <select className="form-control" onChange={update.bind(null, 'status')}>
                <option value="0">Unassigned - New</option>
                <option value="1">Unassigned - Used</option>
                <option value="2">Assigned to user</option>
                <option value="3">Assigned to location</option>
                <option value="4">Surplused</option>
              </select>
            </div>
            <div className="col-sm-6"></div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-4">
              {this.inputField('physical_id', 'Physical ID')}
            </div>
            <div className="col-sm-4">
              <label>Purchase date</label>&nbsp;<i className="fa fa-asterisk text-danger"></i><br/>
              <DatePicker
                className="form-control"
                dateFormat="YYYY-MM-DD"
                todayButton="Today"
                showYearDropdown
                onChange={this.updatePurchaseDate.bind(this)}
                selected={moment(device.purchase_date)}/>
            </div>
            <div className="col-sm-4">
              {this.select('department_id', 'Department', 'departments')}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              {this.select('location_id', 'Building', 'locations')}
            </div>
            <div className="col-sm-5">
              {this.inputField('room_number', 'Location', null, 'Room number, area, etc.')}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label>Notes</label>
              <textarea
                className="form-control"
                value={device.notes}
                onChange={update.bind(null, 'notes')}/>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}

Shared.propTypes = {
  device: PropTypes.object,
  options: PropTypes.object,
  update: PropTypes.func
}
