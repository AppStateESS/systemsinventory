'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from "../FormMixin/InputField.jsx"
import acceptableFields from "../Config/acceptableFields.js"
import ViewDevice from '../View/ViewDevice.jsx'

/* global $ */

export default class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileName: ''
    }
    this.updateName = this.updateName.bind(this)
    this.save = this.save.bind(this)
  }

  save() {
    let profile = {}
    let keys = Object.keys(this.props.device)
    let hasData = false
    keys.forEach(function (key) {
      if (acceptableFields.indexOf(key) !== -1) {
        if (key !== 'device_type_id') {
          hasData = true
        }
        profile[key] = this.props.device[key]
      }
    }.bind(this))
    profile.profile_name = this.state.profileName
    if (hasData) {
      $.post('./systemsinventory/system', profile, null, 'json').done(function (data) {
        this.props.add(data.id, data.name)
        this.props.close()
      }.bind(this)).fail(function () {
        alert('Could not save profile')
        this.props.close()
      })
    }
  }

  updateName(e) {
    this.setState({profileName: e.target.value})
  }

  render() {
    const disabled = this.state.profileName.length === 0
    return (
      <div className="row">
        <div className="col-sm-6">
          <InputField
            name="profileName"
            label="Profile name"
            value={this.state.profileName}
            change={this.updateName}
            required={true}/>
          <button className="btn btn-primary" disabled={disabled} onClick={this.save}>Save profile</button>
          <hr/>
          <ViewDevice device={this.props.device}/>
        </div>
      </div>
    )
  }
}

ProfileForm.propTypes = {
  device: PropTypes.object,
  close: PropTypes.func,
  add: PropTypes.func
}
