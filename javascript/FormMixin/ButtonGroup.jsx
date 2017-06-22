'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class ButtonGroup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let buttons = this.props.buttons.map(function (value, key) {
      const activeColor = 'btn-' + this.props.activeColor
      let cn = classnames('btn', 'btn-default')
      if (this.props.match !== null && this.props.match !== undefined) {
        if (this.props.match.constructor === Array && (this.props.match.indexOf(value.value) !== -1)) {
          cn = classnames('btn', 'active', activeColor)
        } else if (this.props.match == value.value) {
          cn = classnames('btn', 'active', activeColor)
        }
      }

      return (
        <button
          type="button"
          key={key}
          className={cn}
          value={value.value}
          onClick={this.props.handle.bind(null, value.value)}>
          {value.label}
        </button>
      )
    }.bind(this))

    const buttonClass = this.props.vertical === true
      ? 'btn-group-vertical'
      : 'btn-group'

    let hidden
    if (this.props.match && this.props.match.constructor === Array) {
      hidden = this.props.match.map(function (value, key) {
        let name = this.props.name + '[]'
        return <input type="hidden" name={name} value={value} key={key}/>
      }.bind(this))
    } else {
      hidden = <input type="hidden" name={this.props.name} value={this.props.match}/>
    }

    return (
      <div className={buttonClass} role="group">
        {buttons}
        {hidden}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
  handle: PropTypes.func.isRequired,
  activeColor: PropTypes.string,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  vertical: PropTypes.bool,
  name: PropTypes.string
}

ButtonGroup.defaultProp = {
  activeColor: 'default',
  match: null,
  name: null
}

export default ButtonGroup
