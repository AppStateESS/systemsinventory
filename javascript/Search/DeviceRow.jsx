'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

export default class DeviceRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
        overdue:0
    }
    this.verboseStatus = this.verboseStatus.bind(this)
    this.deviceForm = this.deviceForm.bind(this)
  }

  deviceType(type) {
    switch (type) {
      case 1:
      case 2:
        return <FontAwesomeIcon icon={["fas", "desktop"]}/>
        //return 'PC' return 'Server'
      case 8:
        return <FontAwesomeIcon icon={["fas", "laptop"]}/>
        //return 'Laptop'
      case 3:
        return <FontAwesomeIcon icon={["fas", "tablet"]}/>
        //return 'iPad'
      case 4:
        return <FontAwesomeIcon icon={["fas", "print"]}/>
        //return 'Printer'
      case 5:
        return <FontAwesomeIcon icon={["fas", "camera"]}/>
        //return 'Camera'
      case 6:
        return <FontAwesomeIcon icon={["fas", "sign"]}/>
        //return 'Digital sign'
      case 7:
        return <FontAwesomeIcon icon={["fas", "clock"]}/>
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
      case 4:
        return <span>Lost/Stolen</span>
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
    let stolen
    let unSurplus
    let deleteDevice
    let separator
    let inventory
    if (this.props.deity == 1) {
        const red = {
            color: 'red'
        }
        separator = <li role="separator" className="divider"></li>
        deleteDevice = (
            <li>
            <a
                onClick={this.props.showOverlay.bind(null, this.props.value.id, 'delete')}
                style={red}
                className="pointer dropdown-item">
                <i className="far fa-trash-alt"></i>&nbsp;Delete</a>
            </li>
        )
        }

    if (status === 0) {
      inventory = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'inventory')}
          className="pointer dropdown-item">
          <i className="fa fa-check"></i>&nbsp;Inventory Device</a>
        </li>
      surplus = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'surplus')}
          className="pointer dropdown-item">
          <i className="fa fa-truck"></i>&nbsp;Surplus</a>
      </li>
      assign = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'assign')}
          className="pointer dropdown-item">
          <i className="fa fa-user"></i>&nbsp;Assign</a>
      </li>
      stolen = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'stolen')}
          className="pointer dropdown-item">
          <i className="far fa-thumbs-down"></i>&nbsp;Lost/Stolen</a>
      </li>
    } else if (status === 1 || status === 2) {
        inventory = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'inventory')}
          className="pointer dropdown-item">
          <i className="fa fa-check"></i>&nbsp;Inventory Device</a>
        </li>
        editAssign = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'assign')}
          className="pointer dropdown-item">
          <i className="fas fa-pencil-alt"></i>&nbsp;Edit assignment</a>
        </li>
        assign = <li>
            <a
            onClick={this.props.showOverlay.bind(null, this.props.value.id, 'unassign')}
            className="pointer dropdown-item">
            <i className="fas fa-recycle"></i>&nbsp;Unassign</a>
        </li>
    } else if (status === 3) {
      unSurplus = <li>
        <a
          onClick={this.props.showOverlay.bind(null, this.props.value.id, 'unsurplus')}
          className="pointer dropdown-item">
          <i className="fa fa-truck"></i>&nbsp;Return to service</a>
      </li>
        
    }
    
    const editButton = (
      <div
        className="dropdown"
        onClick={function (e) {
          e.stopPropagation()
        }}>
        <i
          className="fa fa-cog fa-lg dropdown-toggle pointer"
          id="dropdownMenu1"
          data-toggle="dropdown"></i>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a
              onClick={this.props.showOverlay.bind(null, this.props.value.id, 'edit')}
              className="pointer dropdown-item">
              <i className="fa fa-cogs"></i>&nbsp;Edit device</a>
          </li>
          {inventory}
          {editAssign}
          {assign}
          {surplus}
          {unSurplus}
          {stolen}
          {separator}
          {deleteDevice}

        </ul>
      </div>
    )

    let rowClass = "pointer"
    if(this.props.auditOverdue){
        rowClass = "danger table-danger pointer"
    }
    
    let row = []
    row.push(<span>{editButton}</span>)
    row.push(<span className="text-center">{this.deviceType(this.props.value.device_type_id)}</span>)
    row.push(<span>{physical_id}</span>)
    row.push(<span>{moment.unix(purchase_date).format('MM-DD-YYYY')}</span>)

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
      <tr
        onClick={this.props.showOverlay.bind(null, this.props.value.id, 'view')}
        className={rowClass}>
        {
          row.map(function (value, key) {
            return <td key={key}>{value}</td>
          })
        }
      </tr>
    )
  }
}

DeviceRow.propTypes = {
  value: PropTypes.object,
  deity: PropTypes.number,
  showOverlay: PropTypes.func.isRequired,
  statusType: PropTypes.number.isRequired,
}
