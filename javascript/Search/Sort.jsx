'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Sort extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let icon
    switch (this.props.direction) {
      case 0:
        icon = <i className="fa fa-sort"></i>
        break
      case 1:
        icon = <i className="fa fa-sort-asc"></i>
        break
      case - 1:
        icon = <i className="fa fa-sort-desc"></i>
        break
    }
    return (
      <span onClick={this.props.handleClick}>{icon}</span>
    )
  }
}

Sort.propTypes = {
  direction: PropTypes.number,
  handleClick: PropTypes.func
}
