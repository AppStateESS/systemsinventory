import React, {Component} from 'react'
import DeviceForm from '../Shared/DeviceForm.jsx'
import moment from 'moment'

/* global $ */

export default class Add extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this)
  }

  save(device) {
    console.log(device);
    $.post('./systemsinventory/system/', device, null, 'json').done(function (data) {
      window.location.href ='./systemsinventory/'
    }.bind(this)).fail(function (data) {
      console.log(data)
    })
  }

  render() {
    return (
      <div>
        <h2>Create device</h2>
        <DeviceForm save={this.save}/>
      </div>
    )
  }
}
