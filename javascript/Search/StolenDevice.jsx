'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const StolenDevice = (props) => {

  return (
    <div>
      <p>You are about to set this device's status to stolen. It should not be deleted
        until investigated and signed off by an administrator.</p>
      <p>Please append the notes below with information about the theft.</p>
      <textarea
        value={props.device.notes}
        className="form-control"
        onChange={props.update.bind(null, 'notes')}/>
      <div className="text-center marginTop">
        <button className="btn btn-lg btn-warning" onClick={props.save}>Report stolen device</button>
      </div>
    </div>
  )
}

StolenDevice.propTypes = {
  save: PropTypes.func,
  device: PropTypes.object,
  update: PropTypes.func
}

export default StolenDevice
