'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Toggle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let className
    let styles = {fontSize : '18px'}
    if (this.props.value) {
      className = 'text-success fa fa-toggle-on'
    } else {
      className = 'text-danger fa fa-toggle-off'
    }
    return (
      <span onClick={this.props.click} className="pointer" style={styles}>
        <i className={className}></i>&nbsp;{this.props.label}
      </span>
    )
  }
}

Toggle.propTypes = {
  value: PropTypes.bool,
  click: PropTypes.func,
  label: PropTypes.string
}

Toggle.defaultProps = {
  label: ''
}
