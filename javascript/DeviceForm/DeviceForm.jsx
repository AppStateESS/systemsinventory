'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PC from './Types/PC.jsx'
import Ipad from './Types/Ipad.jsx'
import Printer from './Types/Printer.jsx'
import Camera from './Types/Camera.jsx'
import Sign from './Types/Sign.jsx'
import Clock from './Types/Clock.jsx'
import Shared from './Shared.jsx'
import required from './required.js'
import Message from '../Mixin/Message.jsx'

export default class DeviceForm extends Component {
  constructor(props) {
    super(props)
    this.errors = []
    this.state = {
      message: null
    }
    this.save = this.save.bind(this)
    this.checkForErrors = this.checkForErrors.bind(this)
    this.clearMessage = this.clearMessage.bind(this)
  }

  collectRequired() {
    let deviceCheck
    let errorChecks
    switch (this.props.device.device_type_id) {
      case 1:
      case 2:
        deviceCheck = required['pc']
        break
      case 3:
        deviceCheck = required['ipad']
        break
      case 4:
        deviceCheck = required['printer']
        break
      case 5:
        deviceCheck = required['camera']
        break
      case 6:
        deviceCheck = required['sign']
        break
      case 7:
        deviceCheck = required['clock']
        break
    }

    const {unassigned, user, assigned} = deviceCheck
    errorChecks = unassigned
    if (this.props.device.status === '3' || this.props.device.status === '2') {
      errorChecks = errorChecks.concat(assigned)
      if (this.props.device.status === '2') {
        errorChecks = errorChecks.concat(user)
      }
    }
    return errorChecks
  }

  checkForErrors() {
    const errorChecks = this.collectRequired()
    let errorFound = false
    let foundIndex = -1
    const {device} = this.props
    errorChecks.forEach(function (item) {
      if (device[item] === undefined || device[item].length === 0) {
        errorFound = true
        this.errors.push(item)
      } else {
        foundIndex = this.errors.indexOf(item)
        if (foundIndex > -1) {
          this.errors.splice(foundIndex, 1)
        }
      }
    }.bind(this))
    return !errorFound
  }

  clearMessage() {
    this.setState({message: null})
  }

  save() {
    if (this.checkForErrors()) {
      this.props.save()
    } else {
      this.setState({message: 'This form is incomplete. Make sure all required fields are complete.'})
      window.scrollTo(0, 0)
    }
  }

  deviceForm() {
    switch (this.props.device.device_type_id) {
      case 3:
        return <Ipad {...this.props} errors={this.errors}/>

      case 4:
        return <Printer {...this.props} errors={this.errors}/>

      case 5:
        return <Camera {...this.props} errors={this.errors}/>

      case 6:
        return <Sign {...this.props} errors={this.errors}/>

      case 7:
        return <Clock {...this.props} errors={this.errors}/>

      case 1:
      case 2:
      default:
        return <PC {...this.props} errors={this.errors}/>
    }
  }

  render() {
    const deviceForm = this.deviceForm()
    let message = null

    if (this.state.message !== null) {
      message = <Message type="danger" onClose={this.clearMessage}>{this.state.message}</Message>
    }

    return (
      <div>
        {message}
        <Shared {...this.props} errors={this.errors}/>
        <hr/>
        <div>{deviceForm}</div>
        <hr/>
        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={this.save}>Save device</button>
        </div>
      </div>
    )
  }
}

DeviceForm.propTypes = {
  device: PropTypes.object,
  options: PropTypes.object,
  update: PropTypes.func,
  save: PropTypes.func
}
