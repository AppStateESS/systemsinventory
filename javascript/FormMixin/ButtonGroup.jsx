'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
* Example buttons prop
* const buttons = [{label: 'One', value: 1}, {...}]
*
*/

const ButtonGroup = ({
  match,
  buttons,
  handle,
  vertical,
  name,
  activeColor
}) => {
  let buttonList = buttons.map(function (value, key) {
    const buttonColor = 'btn-' + activeColor
    let cn = classnames('btn', 'btn-default')
    if (match !== null && match !== undefined) {
      if (match.constructor === Array && (match.indexOf(value.value) !== -1)) {
        cn = classnames('btn', 'active', buttonColor)
      } else if (match == value.value) {
        cn = classnames('btn', 'active', buttonColor)
      }
    }
    return (
      <button
        type="button"
        key={key}
        className={cn}
        value={value.value}
        onClick={handle.bind(null, value.value)}>
        {value.label}
      </button>
    )
  }.bind(this))

  const buttonClass = vertical === true
    ? 'btn-group-vertical'
    : 'btn-group'

  let hidden
  if (match && match.constructor === Array) {
    hidden = match.map(function (value, key) {
      let name = name + '[]'
      return <input type="hidden" name={name} value={value} key={key}/>
    }.bind(this))
  } else {
    hidden = <input type="hidden" name={name} value={match}/>
  }

  return (
    <div className={buttonClass} role="group">
      {buttonList}
      {hidden}
    </div>
  )
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
  handle: PropTypes.func.isRequired,
  activeColor: PropTypes.string,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array,]),
  vertical: PropTypes.bool,
  name: PropTypes.string
}

ButtonGroup.defaultProps = {
  activeColor: 'default',
  match: '',
  name: ''
}

export default ButtonGroup
