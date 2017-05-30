'use strict'
import React, {Component} from 'react'
import InputField from '../Mixin/InputField.jsx'
import PropTypes from 'prop-types'
import required from './required.js'
import SelectFilter from '../Mixin/SelectFilter.jsx'

export default class Device extends Component {
  constructor(props) {
    super(props)
    this.deviceName
    this.isRequired = this.isRequired.bind(this)
    this.inputField = this.inputField.bind(this)
  }

  isRequired(deviceName, spec) {
    /*
    * 0 new assigned
    * 1 used unassigned
    * 2 assigned person
    * 3 assigned location
    * 4 surplus
    */

    const {device} = this.props
    const unassigned = required[deviceName].unassigned.indexOf(spec) !== -1
    if (unassigned) {
      return true
    } else if ((device.status === '3' || device.status === '2') && required[deviceName].assigned.indexOf(spec) !== -1) {
      return true
    } else if (device.status === '2' && required[deviceName].user.indexOf(spec) !== -1) {
      return true
    } else {
      return false
    }
  }

  select(varname, label = null, optionName = null) {
    const {device, update, options} = this.props
    if (optionName === null) {
      optionName = varname
    }
    return (
      <div>
        <SelectFilter
          label={this.getLabel(label, varname)}
          required={this.isRequired('pc', varname)}
          value={device[varname]}
          options={options[optionName]}
          update={update.bind(null, varname)}
          name={varname}/>
      </div>
    )
  }

  errorMessage(varname, label) {
    const {errors} = this.props
    if (errors.indexOf(varname) !== -1) {
      return `${label} may not be empty`
    } else {
      return null
    }
  }

  getLabel(label, varname) {
    if (label === null) {
      label = varname.charAt(0).toUpperCase() + varname.slice(1)
      label = label.replace('_', ' ')
    }
    return label
  }

  inputField(varname, label = null, disabled = false, placeholder = null) {
    const {device, update} = this.props
    label = this.getLabel(label, varname)
    return (<InputField
      name={varname}
      disabled={disabled}
      value={device[varname]}
      placeholder={placeholder}
      errorMessage={this.errorMessage(varname, label)}
      required={this.isRequired('pc', varname)}
      label={label}
      change={update.bind(null, varname)}/>)
  }

  render() {
    return (
      <div></div>
    )
  }
}

Device.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  errors : PropTypes.array
}
