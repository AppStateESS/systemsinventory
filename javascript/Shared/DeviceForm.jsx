'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PC from '../DeviceForms/PC.jsx'
import Ipad from '../DeviceForms/Ipad.jsx'
import Printer from '../DeviceForms/Printer.jsx'
import Camera from '../DeviceForms/Camera.jsx'
import Sign from '../DeviceForms/Sign.jsx'
import Clock from '../DeviceForms/Clock.jsx'
import Shared from '../DeviceForms/Shared.jsx'
import SelectFilter from '../FormMixin/SelectFilter.jsx'
import Overlay from '../Mixin/Overlay.jsx'
import ProfileForm from './ProfileForm.jsx'
import acceptableFields from '../Config/acceptableFields.js'
import Device from '../Mixin/Device.js'
import Message from '../Mixin/Message.jsx'

/* global $, jsonFilters, profiles */

export default class DeviceForm extends Component {
  constructor(props) {
    super(props)
    this.errors = []
    this.state = {
      profile: 0,
      overlay: false,
      message: {
        type: 'info',
        content: ''
      }
    }
    this.errors = []
    this.save = this.save.bind(this)
    this.overlay = this.overlay.bind(this)
    this.addProfile = this.addProfile.bind(this)
    this.fillProfile = this.fillProfile.bind(this)
    this.closeOverlay = this.closeOverlay.bind(this)
    this.resetMessage = this.resetMessage.bind(this)
    this.deleteProfile = this.deleteProfile.bind(this)
    this.addToProfiles = this.addToProfiles.bind(this)
    this.profileListing = this.profileListing.bind(this)
  }

  addProfile() {
    this.setState({overlay: true})
  }

  closeOverlay() {
    this.setState({overlay: false})
  }

  resetMessage() {
    this.setMessage('', 'info')
  }

  setMessage(content, type) {
    let message = this.state.message
    message.type = type
    message.content = content
    this.setState({message: message})
  }

  addToProfiles(id, name) {
    if (!profiles[this.props.device.device_type_id]) {
      profiles[this.props.device.device_type_id]=[]
    }
    profiles[this.props.device.device_type_id].push({id: id, name: name})
    this.setState({profile: id})
  }

  overlay() {
    if (this.state.overlay) {
      return (
        <Overlay title="Save profile" close={this.closeOverlay}>
          <ProfileForm
            device={this.props.device}
            close={this.closeOverlay}
            add={this.addToProfiles}/>
        </Overlay>
      )
    }
  }

  deleteProfile() {
    const currentProfiles = profiles[this.props.device.device_type_id]
    currentProfiles.forEach(function (value, key) {
      if (value.id === this.state.profile) {
        currentProfiles.splice(key, 1)
        this.forceUpdate()
      }
    }.bind(this))
    if (confirm('Are you sure you want to delete this profile?')) {
      $.ajax({
        url: './systemsinventory/system/profile/',
        data: {
          profile: this.state.profile
        },
        dataType: 'json',
        type: 'delete',
        success: function () {
          this.setMessage('Profile deleted', 'success')
        }.bind(this),
        error: function () {
          this.setMessage('Profile deletion failed', 'danger')
        }.bind(this)
      })
    }
  }

  profileListing() {
    if (this.props.device.id > 0) {
      return null
    }
    const {device_type_id} = this.props.device
    let profileListing

    if (profiles[device_type_id] === undefined) {
      profileListing = (
        <div className="col-sm-3">
          No profiles available
        </div>
      )
    } else {
      let options
      options = profiles[device_type_id].map(function (value) {
        return {value: value.id, label: value.name}
      })
      profileListing = (
        <div className="col-sm-6">
          <SelectFilter
            value={this.state.profile}
            options={options}
            update={this.fillProfile}
            name="profile"/>
        </div>
      )
    }

    let deleteButton
    if (this.state.profile > 0) {
      deleteButton = (
        <button className="btn btn-danger " onClick={this.deleteProfile}>
          <i className="fa fa-trash-o"></i>
        </button>
      )
    }

    return (
      <div className="row marginBottom">
        <div className="col-sm-2">
          <label>Profile</label>
        </div>
        {profileListing}
        <div className="col-sm-4">
          <div className="btn-group">
            <button
              className="btn btn-success "
              onClick={this.addProfile}
              disabled={!Device.profileReady(this.props.device)}>
              <i className="fa fa-plus"></i>
            </button>{deleteButton}</div>
        </div>
      </div>
    )
  }

  fillProfile(e) {
    this.setState({profile: e})
    let device = this.props.device
    $.getJSON('./systemsinventory/system/getProfile', {profile_id: e}).done(function (data) {
      acceptableFields.forEach(function (value) {
        if (data[value] !== undefined && data[value] !== null) {
          device[value] = data[value]
        }
      })
      this.setState({device: device})
    }.bind(this))
  }

  save() {
    if (Device.checkForErrors(this.props.device, this.errors)) {
      this.props.save(this.props.device)
    } else {
      const message = 'Please complete all required fields'
      this.setMessage(message, 'danger')
      window.scrollTo(0, 0)
      this.forceUpdate()
    }
  }

  deviceForm() {
    const {device} = this.props
    switch (parseInt(device.device_type_id)) {
      case 3:
        return <Ipad
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>

      case 4:
        return <Printer
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>

      case 5:
        return <Camera
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>

      case 6:
        return <Sign
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>

      case 7:
        return <Clock
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>

      case 1:
      case 2:
      default:
        return <PC
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>
    }
  }

  render() {
    const {device} = this.props
    const overlay = this.overlay()
    let message
    if (this.state.message.content.length > 0) {
      message = <Message type={this.state.message.type} onClose={this.resetMessage}>{this.state.message.content}</Message>
    }
    return (
      <div>
        {overlay}
        {message}
        {this.profileListing()}
        <Shared
          device={device}
          update={this.props.update}
          options={jsonFilters}
          errors={this.errors}/>
        <hr/>
        <div>{this.deviceForm()}</div>
        <div className="text-center marginTop">
          <button className="btn btn-lg btn-success" onClick={this.save}>Save device</button>
        </div>
      </div>
    )
  }
}

DeviceForm.propTypes = {
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  device: PropTypes.object.isRequired
}
