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
    const {device, update} = this.props

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
          label: 'Assign to person'
        }, {
          value: '2',
          label: 'Assign to location'
        }
      ]
      assignToggle = (
        <div className="marginBottom"><ButtonGroup
          buttons={buttons}
          match={device.status}
          name="status"
          handle={update.bind(null, 'status')}/>
        </div>
      )
    }

    let unassignedErrors
    if (this.state.unassignedErrors) {
      unassignedErrors = (
        <div className="alert alert-danger">
          <i className="pull-left fa fa-exclamation-circle fa-2x marginRight"></i>
          <strong>Notice!</strong>&nbsp; This device can not be assigned until&nbsp;
          <strong>ALL</strong>&nbsp; unassigned required fields are complete.<br/>
          <button className="btn btn-default btn-sm" onClick={this.props.edit}>Edit the device and fill in all required fields</button>
        </div>
      )
    }

    return (
      <div>
        {unassignedErrors}
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
        <button
          className="marginTop btn btn-primary"
          onClick={this.props.assign}
          disabled={!Device.checkForErrors(device, this.errors)}>Assign device</button>
      </div>
    )
  }
}

AssignForm.propTypes = {
  assign: PropTypes.func,
  edit: PropTypes.func
}
