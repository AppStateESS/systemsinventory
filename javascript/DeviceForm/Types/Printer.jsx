'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../../Mixin/InputField.jsx'
import BigCheckbox from '../../Mixin/BigCheckbox.jsx'
import UserInformation from '../UserInformation.jsx'
import Network from '../Network.jsx'

export default class Printer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <Network {...this.props}/>
        <hr />
        <UserInformation {...this.props}/>
        <hr/>
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
            <div className="col-sm-4">
              <InputField
                name="toner"
                value={device.toner}
                label="Toner"
                change={update.bind(null, 'toner')}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <BigCheckbox
                checked={device.color === 1}
                handle={update.bind(null, 'color', device.color === 1
                ? 0
                : 1)}
                label="Color"/>
            </div>
            <div className="col-sm-4">
              <BigCheckbox
                checked={device.duplex === 1}
                handle={update.bind(null, 'duplex', device.duplex === 1
                ? 0
                : 1)}
                label="Duplex"/>
            </div>
            <div className="col-sm-4">
              <BigCheckbox
                checked={device.network === 1}
                handle={update.bind(null, 'network', device.network === 1
                ? 0
                : 1)}
                label="Network"/>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}

Printer.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func
}
