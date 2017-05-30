'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../../Mixin/InputField.jsx'
import BigCheckbox from '../../Mixin/BigCheckbox.jsx'
import Network from '../Network.jsx'

export default class Sign extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.selectUpdate = this.selectUpdate.bind(this)
  }

  selectUpdate(varname, value) {
    this.props.update(varname, value.value)
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <Network {...this.props} vlan={true}/>
        <hr/>
        <fieldset>
          <legend>Device specifications</legend>
          <div className="row">
            <div className="col-sm-3">
              <InputField
                name="model"
                value={device.model}
                required={true}
                label="Model"
                change={update.bind(null, 'model')}/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="processor"
                value={device.processor}
                label="Processor"
                change={update.bind(null, 'processor')}/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="screen_manufacturer"
                value={device.screen_manufacturer}
                label="Screen manufacturer"
                change={update.bind(null, 'screen_manufacturer')}/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="player_manufacturer"
                value={device.player_manufacturer}
                label="Player manufacturer"
                change={update.bind(null, 'player_manufacturer')}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <InputField
                name="screen_size"
                value={device.screen_size}
                label="Screen size"
                change={update.bind(null, 'screen_size')}/>
              </div>
            <div className="col-sm-3">
              <InputField
                name="ram"
                value={device.ram}
                label="RAM"
                change={update.bind(null, 'ram')}/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="hard_drive"
                value={device.hard_drive}
                label="Hard drive"
                change={update.bind(null, 'hard_drive')}/>
            </div>
          </div>
          <div className="row">
          </div>
        </fieldset>
        <BigCheckbox
          checked={device.hi_def === 1}
          handle={update.bind(null, 'hi_def', device.hi_def === 1
          ? 0
          : 1)}
          label="High Definition"/>
      </div>
    )
  }
}

Sign.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object
}
