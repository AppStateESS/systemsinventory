'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DeviceRow extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.verboseStatus = this.verboseStatus.bind(this)
    this.deviceForm = this.deviceForm.bind(this)
  }

  deviceType(device_id) {
    switch (device_id) {
      case 1:
      case 2:
        return <i className="fa fa-desktop"></i>
        //return 'PC' return 'Server'
      case 3:
        return <i className="fa fa-tablet"></i>
        //return 'iPad'
      case 4:
        return <i className="fa fa-print"></i>
        //return 'Printer'
      case 5:
        return <i className="fa fa-video-camera"></i>
        //return 'Camera'
      case 6:
        return <i className="fa fa-map-signs"></i>
        //return 'Digital sign'
      case 7:
        return <i className="fa fa-clock-o"></i>
        //return 'Time clock'
      default:
        'Unknown'
    }
  }

  deviceForm(e) {
    e.preventDefault()
    this.props.showOverlay.bind(null, this.props.value.id, 'edit')
  }

  verboseStatus(status) {
    switch (status) {
      case 0:
        return <span>Unassigned</span>
      case 1:
        return <span>Assigned - person</span>
      case 2:
        return <span>Assigned - location</span>
      case 3:
        return <span>Surplus</span>
    }
  }

  render() {
    const {
      physical_id,
      model,
      username,
      department_name,
      location_name,
      device_type_id,
      status
    } = this.props.value

    let assign
    if (status === 0) {
      assign = <li><a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'assign')} className="pointer"><i className="fa fa-user"></i>&nbsp;Assign</a></li>
    } else if (status === 1 || status === 2) {
      assign = <li><a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'unassign')} className="pointer"><i className="fa fa-recycle"></i>&nbsp;Unassign</a></li>
    }

    const editButton = (
      <div className="dropdown">
        <i
          className="fa fa-gear fa-lg dropdown-toggle pointer"
          id="dropdownMenu1"
          data-toggle="dropdown"></i>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'edit')} className="pointer"><i className="fa fa-edit"></i>&nbsp;Edit</a>
          </li>
          {assign}
          <li role="separator" className="divider"></li>
          <li>
            <a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'delete')} style={{color: 'red'}}className="pointer"><i className="fa fa-trash-o"></i>&nbsp;Delete</a>
          </li>
        </ul>
      </div>
    )

    switch (this.props.statusType) {
      case 0:
        return (
          <tr>
            <td>{editButton}
            </td>
            <td className="text-center">
              {this.deviceType(device_type_id)}
            </td>
            <td>
              {physical_id}
            </td>
            <td>
              {model}
            </td>
            <td>
              {this.verboseStatus(status)}
            </td>
          </tr>
        )
      case 1:
        return (
          <tr>
            <td>
              {editButton}
            </td>
            <td>
              {this.deviceType(device_type_id)}
            </td>
            <td>
              {physical_id}
            </td>
            <td>
              {model}
            </td>
          </tr>
        )
      case 2:
        return (
          <tr>
            <td>{editButton}
            </td>
            <td>
              {this.deviceType(device_type_id)}
            </td>
            <td>
              {physical_id}
            </td>
            <td>
              {model}
            </td>
            <td>
              {username}
            </td>
            <td>
              {location_name}
            </td>
            <td>
              {department_name}
            </td>
          </tr>
        )
      case 3:
        return (
          <tr>
            <td>{editButton}
            </td>
            <td>
              {this.deviceType(device_type_id)}
            </td>
            <td>
              {physical_id}
            </td>
            <td>
              {model}
            </td>
          </tr>
        )
    }
  }
}

DeviceRow.propTypes = {
  value: PropTypes.object,
  showOverlay: PropTypes.func,
  statusType: PropTypes.number,
  assign: PropTypes.func
}
