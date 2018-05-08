'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../DeviceForms/Base.jsx'
import Device from '../Mixin/Device.js'
import PC from './PC.jsx'
import Camera from './Camera.jsx'
import Clock from './Clock.jsx'
import Ipad from './Ipad.jsx'
import Printer from './Printer.jsx'
import Sign from './Sign.jsx'
import ButtonGroup from '../FormMixin/ButtonGroup.jsx'

export default class AssignForm extends Base {
  constructor(props) {
    super(props)
    this.errors = []
    this.state = {
      unassignedErrors: false
    }
    this.testUnassigned = this.testUnassigned.bind(this)
  }

  componentDidMount() {
    this.testUnassigned()
  }

  testUnassigned() {
    let errors = []
    if (!Device.checkForErrors(this.props.device, errors, 0)) {
      this.setState({unassignedErrors: true})
    }
  }

  render() {
    const {device, update,} = this.props

    let assignForm
    switch (device.device_type_id) {
      case 1:
      case 2:
        assignForm = <PC {...this.props}/>
        break

      case 3:
        assignForm = <Ipad {...this.props}/>
        break

      case 4:
        assignForm = <Printer {...this.props}/>
        break

      case 5:
        assignForm = <Camera {...this.props}/>
        break

      case 6:
        assignForm = <Sign {...this.props}/>
        break
      case 7:
        assignForm = <Clock {...this.props}/>
        break
    }

    let assignToggle
    if (Device.userAssigned(device)) {
      const buttons = [
        {
          value: '1',
          label: 'Assign to person',
        }, {
          value: '2',
          label: 'Assign to location',
        },
      ]
      assignToggle = (
        <div className="marginBottom">
          <ButtonGroup
            buttons={buttons}
            match={device.status}
            name="status"
            handle={update.bind(null, 'status')}/>
        </div>
      )
    }

    let statusTypeError
    let unassignedErrors
    if (this.state.unassignedErrors) {
      unassignedErrors = (
        <div className="alert alert-danger text-center">
          <div>
            <i className="fa fa-exclamation-circle marginRight"></i>
            <strong>Notice!</strong>&nbsp;This device can not be assigned until&nbsp;<strong>ALL</strong>&nbsp;device fields are complete.
          </div>
          <div className="marginTop">
            <button className="btn btn-outline-dark" onClick={this.props.edit}>Edit the device and fill in all required fields</button>
          </div>
        </div>
      )
    } else if (device.status == 2 && (device.username != null && device.username.length > 0)) {
      statusTypeError = (
        <div className="alert alert-danger text-center">
          <div>
            <i className="fa fa-exclamation-circle marginRight"></i>
            <strong>Notice!</strong>&nbsp;This device has a location assignment but contains
            user information. Consider reassignment to a person.
          </div>
        </div>
      )
    }

    return (
      <div>
        {unassignedErrors}
        {statusTypeError}
        {assignToggle}
        <div className="row">
          <div className="col-sm-4">
            {this.select('department_id', 'Department', 'departments')}
          </div>
          <div className="col-sm-4">
            {this.select('location_id', 'Building', 'locations')}
          </div>
          <div className="col-sm-4">
            {this.inputField('room_number', 'Location in Building')}
          </div>
        </div>
        <div className="row marginBottom">
          <div className="col-sm-12">
            <label>Notes</label>
            <textarea
              className="form-control"
              value={device.notes === null
                ? ''
                : device.notes}
              onChange={this.props.update.bind(null, 'notes')}/>
          </div>
        </div>
        {assignForm}
        <div className="text-center">
          <button
            className="marginTop btn btn-lg btn-primary"
            onClick={this.props.assign}
            disabled={!Device.checkForErrors(device, this.errors, device.status)}>Assign device</button>
        </div>
      </div>
    )
  }
}

AssignForm.propTypes = {
  assign: PropTypes.func,
  edit: PropTypes.func,
}
