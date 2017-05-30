'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputField from '../../Mixin/InputField.jsx'
import BigCheckbox from '../../Mixin/BigCheckbox.jsx'
import Network from '../Network.jsx'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {device, update} = this.props
    return (
      <div>
        <Network {...this.props}/>
        <fieldset>
          <legend>
            Device specifications
          </legend>
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
                change={update.bind(null, 'manufacturer')}
                label="Manufacturer"/>
              </div>
            <div className="col-sm-4">
              <InputField
                name="resolution"
                value={device.resolution}
                label="Resolution"
                change={update.bind(null, 'resolution')}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <BigCheckbox
                checked={device.hi_def === 1}
                handle={update.bind(null, 'hi_def', device.hi_def === 1
                ? 0
                : 1)}
                label="High definition"/>
              <div>
                <BigCheckbox
                  checked={device.external === 1}
                  handle={update.bind(null, 'external', device.external === 1
                  ? 0
                  : 1)}
                  label="External installation"/>
              </div>
              <div>
                <BigCheckbox
                  checked={device.covert === 1}
                  handle={update.bind(null, 'covert', device.covert === 1
                  ? 0
                  : 1)}
                  label="Covert placement"/>
              </div>
            </div>
            <div className="col-sm-6">
              <div>
                <BigCheckbox
                  checked={device.sd_support === 1}
                  handle={update.bind(null, 'sd_support', device.sd_support === 1
                  ? 0
                  : 1)}
                  label="SD Card support"/>
              </div>
              <div>
                <BigCheckbox
                  checked={device.status === 1}
                  handle={update.bind(null, 'status', device.status === 1
                  ? 0
                  : 1)}
                  label="Currently operational"/>
              </div>
            </div>
          </div>
        </fieldset>

      </div>
    )
  }
}

Camera.propTypes = {
  device: PropTypes.object,
  update: PropTypes.func
}
