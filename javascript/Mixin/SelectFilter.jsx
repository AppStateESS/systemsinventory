'use strict'
import React, {Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'

export default class SelectFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
    this.checkRequired = this.checkRequired.bind(this)
  }

  checkRequired() {
    this.setState({
      error: this.props.required === true && this.props.value === ''
    })
  }

  render() {
    let required
    let error
    if (this.props.required) {
      required = (
        <span>&nbsp;<i className="fa fa-asterisk text-danger"></i>
        </span>
      )

      if (this.props.value === undefined) {
        error = <div className="label label-danger">{`Select an option for ${this.props.label}`}</div>
      }
    }

    return (
      <div className="filter">
        <label>{this.props.label}{required}</label>
        <Select
          value={this.props.value}
          simpleValue={true}
          options={this.props.options}
          onChange={this.props.update}
          onBlur={this.checkRequired}/> {error}
      </div>
    )
  }
}

SelectFilter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  update: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool
}

SelectFilter.defaultProps = {
  required: false
}
