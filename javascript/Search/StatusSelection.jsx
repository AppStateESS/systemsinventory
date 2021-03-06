'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class StatusSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div className="btn-group" role="group">
        <button
          className={this.props.active === 0 ? 'btn btn-primary' : 'btn btn-default'}
          onClick={this.props.update.bind(null, 'statusType', 0)}>All</button>
        <button
          className={this.props.active === 1 ? 'btn btn-primary' : 'btn btn-default'}
          onClick={this.props.update.bind(null, 'statusType', 1)}>Unassigned</button>
        <button
          className={this.props.active === 2 ? 'btn btn-primary' : 'btn btn-default'}
          onClick={this.props.update.bind(null, 'statusType', 2)}>Assigned</button>
        <button
          className={this.props.active === 3 ? 'btn btn-primary' : 'btn btn-default'}
          onClick={this.props.update.bind(null, 'statusType', 3)}>Surplus</button>
        <button
          className={this.props.active === 4 ? 'btn btn-primary' : 'btn btn-default'}
          onClick={this.props.update.bind(null, 'statusType', 4)}>Lost/Stolen</button>
        <button
          className={this.props.active === 5 ? 'btn btn-primary' : 'btn btn-default'}
          onClick={this.props.update.bind(null, 'statusType', 5)}>Checkout</button>
      </div>
    )
  }
}

StatusSelection.propTypes = {
  update: PropTypes.func,
  active: PropTypes.number,
}
