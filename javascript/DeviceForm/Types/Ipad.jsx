'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../../Mixin/InputField.jsx'
import SelectFilter from '../../Mixin/SelectFilter.jsx'
import BigCheckbox from '../../Mixin/BigCheckbox.jsx'
import UserInformation from '../UserInformation.jsx'
import Network from '../Network.jsx'

export default class Ipad extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, update, options} = this.props
    return (
      <div>
        <Network {...this.props}/>
        <hr/>
        <UserInformation {...this.props}/>
        <hr/>
        <fieldset>
          <legend>
            Device specifications
          </legend>
          <div className="row">
            <div className="col-sm-3">
              <SelectFilter
                label="System usage"
                value={device.system_usage}
                options={options.system_usage}
                update={update.bind(null, 'system_usage')}
                name="system_usage"/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="hard_drive"
                value={device.hard_drive}
                label="Hard drive"
                change={update.bind(null, 'hard_drive')}/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="apple_id"
                value={device.apple_id}
                label="Apple ID"
                change={update.bind(null, 'apple_id')}/>
            </div>
            <div className="col-sm-3">
              <InputField
                name="generation"
                value={device.generation}
                label="Generation"
                change={update.bind(null, 'generation')}/>
            </div>
          </div>
          <BigCheckbox
            checked={device.protective_case === 1}
            handle={update.bind(null, 'protective_case', device.protective_case === 1
            ? 0
            : 1)}
            label="Protective case"/>
        </fieldset>

      </div>
    )
  }
}

Ipad.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func,
  options: PropTypes.object,
  selectUpdate: PropTypes.func
}
