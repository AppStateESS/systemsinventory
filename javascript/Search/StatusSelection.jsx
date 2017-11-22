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
          className={classNames('btn', 'btn-default', {
            'btn-primary': this.props.active === 0
          })}
          onClick={this.props.update.bind(null, 'statusType', 0)}>All</button>
        <button
          className={classNames('btn', 'btn-default', {
            'btn-primary': this.props.active === 1
          })}
          onClick={this.props.update.bind(null, 'statusType', 1)}>Unassigned</button>
        <button
          className={classNames('btn', 'btn-default', {
            'btn-primary': this.props.active === 2
          })}
          onClick={this.props.update.bind(null, 'statusType', 2)}>Assigned</button>
        <button
          className={classNames('btn', 'btn-default', {
            'btn-primary': this.props.active === 3
          })}
          onClick={this.props.update.bind(null, 'statusType', 3)}>Surplus</button>
        <button
          className={classNames('btn', 'btn-default', {
            'btn-primary': this.props.active === 4
          })}
          onClick={this.props.update.bind(null, 'statusType', 4)}>Lost/Stolen</button>
      </div>
    )
  }
}

StatusSelection.propTypes = {
  update: PropTypes.func,
  active: PropTypes.number,
}
