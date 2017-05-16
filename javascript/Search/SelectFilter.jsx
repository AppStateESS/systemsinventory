'use strict'
import React, {Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'

export default class SelectFilter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="filter">
        <strong>{this.props.label}</strong>
        <Select
          value={this.props.value}
          options={this.props.options}
          onChange={this.props.update}/>
      </div>
    )
  }
}

SelectFilter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  options: PropTypes.array,
  update: PropTypes.func,
  name: PropTypes.string,
}
