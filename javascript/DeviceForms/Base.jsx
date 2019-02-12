'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../FormMixin/InputField.jsx'
import SelectFilter from '../FormMixin/SelectFilter.jsx'
import Device from '../Mixin/Device.js'
import UserSearch from '../Search/UserSearch.jsx'

export default class Base extends Component {
  constructor(props) {
    super(props)
    this.inputField = this.inputField.bind(this)
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
          required={Device.isRequired(device, varname)}
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

  inputField(varname, label = null, disabled = false, placeholder = null, inputvalue=null) {
    const {device, update} = this.props
    label = this.getLabel(label, varname)
    return (<InputField
      name={varname}
      disabled={disabled}
      value={inputvalue ? inputvalue : device[varname]}
      placeholder={placeholder}
      errorMessage={this.errorMessage(varname, label)}
      required={Device.isRequired(device, varname)}
      label={label}
      change={update.bind(null, varname)}/>)
  }
  
  userSearch(varname, label = null, disabled = false, placeholder = null, inputvalue=null) {
      const {device, update} = this.props
      label = this.getLabel(label, varname)
      return (<UserSearch
      name={varname}
      disabled={disabled}
      value={device[varname] ? device[varname] : ''}
      placeholder={placeholder}
      errorMessage={this.errorMessage(varname, label)}
      required={Device.isRequired(device, varname)}
      setName={this.updateName}
      label={label}/>)
  }

  canEdit() {
    const {device, update} = this.props
    return device.status
  }
  
  render() {
    return (
      <div></div>
    )
  }
}

Base.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  errors: PropTypes.array
}
