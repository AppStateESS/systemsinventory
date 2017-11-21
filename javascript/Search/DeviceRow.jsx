'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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
      purchase_date,
      status
    } = this.props.value
    let assign
    let editAssign
    let surplus
    if (status === 0) {
      surplus = <li><a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'surplus')} className="pointer"><i className="fa fa-truck"></i>&nbsp;Surplus</a></li>
      assign = <li><a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'assign')} className="pointer"><i className="fa fa-user"></i>&nbsp;Assign</a></li>
    } else if (status === 1 || status === 2) {
      editAssign = <li><a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'assign')} className="pointer"><i className="fa fa-pencil"></i>&nbsp;Edit assignment</a></li>
      assign = <li><a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'unassign')} className="pointer"><i className="fa fa-recycle"></i>&nbsp;Unassign</a></li>
    }

    const red = {color: 'red'}
    const editButton = (
      <div className="dropdown" onClick={function(e){e.stopPropagation()}}>
        <i
          className="fa fa-gear fa-lg dropdown-toggle pointer"
          id="dropdownMenu1"
          data-toggle="dropdown"></i>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'view')} className="pointer"><i className="fa fa-eye"></i>&nbsp;View</a>
          </li>
          <li>
            <a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'edit')} className="pointer"><i className="fa fa-cogs"></i>&nbsp;Edit device</a>
          </li>
          {editAssign}
          {assign}
          {surplus}
          <li role="separator" className="divider"></li>
          <li>
            <a onClick={this.props.showOverlay.bind(null, this.props.value.id, 'delete')} style={red} className="pointer"><i className="fa fa-trash-o"></i>&nbsp;Delete</a>
          </li>
        </ul>
      </div>
    )

    let row = []
    row.push(<span>{editButton}</span>)
    row.push(<span className="text-center">{this.deviceType(device_type_id)}</span>)
    row.push(<span>{physical_id}</span>)
    row.push(<span>{moment.unix(purchase_date).format('YYYY-MM-DD')}</span>)

    switch (this.props.statusType) {
      case 0:
        row.push(<span>{model}</span>)
        row.push(<span>{this.verboseStatus(status)}</span>)
        break

      case 1:
        row.push(<span>{model}</span>)
        break

      case 2:
        row.push(<span>{model}</span>)
        row.push(<span>{username}</span>)
        row.push(<span>{location_name}</span>)
        row.push(<span>{department_name}</span>)
        break

      case 3:
        row.push(<span>{model}</span>)
        break
    }
    return (
      <tr onClick={this.props.showOverlay.bind(null, this.props.value.id, 'view')} className="pointer">
        {row.map(function(value,key){
          return <td key={key}>{value}</td>
        })}
      </tr>
    )
  }
}

DeviceRow.propTypes = {
  value: PropTypes.object,
  showOverlay: PropTypes.func.isRequired,
  statusType: PropTypes.number.isRequired,
}
