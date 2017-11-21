'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import Select from 'react-select'

export default class TooltipSelectSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const tooltip = (
      <div style={{minWidth: '250px'}}>
      <Select
        value={this.props.value}
        options={this.props.options}
        onChange={this.props.change}/>
      </div>
    )

    return (
      <Tooltip placement="top" trigger={['click']} overlay={tooltip}>
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
      </Tooltip>
    )
  }
}

TooltipSelectSearch.propTypes = {
  change: PropTypes.func,
  value: PropTypes.number,
  options: PropTypes.array
}
