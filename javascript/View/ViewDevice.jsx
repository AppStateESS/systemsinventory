'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Assigned from './Assigned.jsx'
import PC from './PC.jsx'
import Ipad from './Ipad.jsx'
import Printer from './Printer.jsx'
import Camera from './Camera.jsx'
import DigitalSign from './DigitalSign.jsx'
import TimeClock from './TimeClock.jsx'
import Device from '../Mixin/Device.js'

export default class ViewDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.system = this.system.bind(this)
  }

  system() {
    const {device} = this.props
    switch (device.device_type_id) {
      case 1:
      case 2:
        return <PC device={device}/>
      case 3:
        return <Ipad device={device}/>
      case 4:
        return <Printer device={device}/>
      case 5:
        return <Camera device={device}/>
      case 6:
        return <DigitalSign device={device}/>
      case 7:
        return <TimeClock device={device}/>
    }
  }

  render() {
    const {device} = this.props


    let assigned
    if (device.status === 1 || device.status === 2) {
      assigned = <Assigned device={device}/>
    }
    return (
      <div>
        <h2>Status: {Device.getStatus(device)}</h2>
        <div className="row">
          <div className="col-sm-6">
            <h3>Device details</h3>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Device type</th>
                  <td>{device.device_type}</td>
                </tr>
                <tr>
                  <th>Purchase date</th>
                  <td>{device.purchase_date}</td>
                </tr>
                <tr>
                  <th>Notes</th>
                  <td>{device.notes}</td>
                </tr>
                <tr>
                  <th>MAC</th>
                  <td>{device.mac}</td>
                </tr>
              </tbody>
              {this.system()}
            </table>
          </div>
          <div className="col-sm-6">
            {assigned}
          </div>
        </div>
      </div>
    )
  }
}
ViewDevice.propTypes = {
  device: PropTypes.object.isRequired
}
