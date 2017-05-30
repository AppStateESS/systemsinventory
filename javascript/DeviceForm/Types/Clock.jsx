'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../../Mixin/InputField.jsx'
import Network from '../Network.jsx'

export default class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <Network {...this.props} vlan={true}/>
        <fieldset>
          <legend>Device specifications</legend>
          <div className="row">
            <div className="col-sm-4">
              <InputField
                name="model"
                value={device.model}
                required={true}
                label="Model"
                change={update.bind(null, 'model')}/>
            </div>
            <div className="col-sm-4">
              <InputField
                name="manufacturer"
                value={device.manufacturer}
                label="Manufacturer"
                change={update.bind(null, 'manufacturer')}/>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}

Clock.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  selectUpdate: PropTypes.func
}
