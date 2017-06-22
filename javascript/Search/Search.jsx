'use strict'
import React from 'react'
import Filters from './Filters.jsx'
import Listing from './Listing.jsx'
import SystemSelection from './SystemSelection.jsx'
import StatusSelection from './StatusSelection.jsx'
import {Modal, Effect} from 'react-dynamic-modal'
import Overlay from '../Mixin/Overlay.jsx'
import DeviceForm from '../Shared/DeviceForm.jsx'
import modalCss from './ModalCss.js'
import AssignForm from '../AssignForms/AssignForm.jsx'
import DeleteDevice from './DeleteDevice.jsx'
import UnassignDevice from './UnassignDevice.jsx'
import ViewDevice from '../View/ViewDevice.jsx'
import Device from '../Mixin/Device.js'
import FormBase from '../Shared/FormBase.jsx'

/* global $, jsonFilters, restricted */

export default class Search extends FormBase {
  constructor() {
    super()

    this.offset = 0
    this.state = {
      modalOpen: false,
      filters: {
        systemType: ['all'],
        statusType: 0,
        department: null,
        location: null,
        physicalId: '',
        macAddress: '',
        purchaseDate: '',
        model: '',
        ipAddress: '',
        username: ''
      },

      showOverlay: false,
      formType: null,
      total: 0,
      shown: 0,
      more: false,
      listing: null,
      sort: {
        column: null,
        direction: 0
      },
      restricted: false
    }
    this.load = this.load.bind(this)
    this.save = this.save.bind(this)
    this.reset = this.reset.bind(this)
    this.delete = this.delete.bind(this)
    this.assign = this.assign.bind(this)
    this.download = this.download.bind(this)
    this.unassign = this.unassign.bind(this)
    this.maxOffset = this.maxOffset.bind(this)
    this.openModal = this.openModal.bind(this)
    this.editSwitch = this.editSwitch.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showOverlay = this.showOverlay.bind(this)
    this.closeOverlay = this.closeOverlay.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.incrementOffset = this.incrementOffset.bind(this)
    this.updateSystemType = this.updateSystemType.bind(this)
    this.updateDeviceValue = this.updateDeviceValue.bind(this)
    this.updateSelectFilter = this.updateSelectFilter.bind(this)
  }

  componentDidMount() {
    if (restricted) {
      this.setState({restricted: true, statusType: 2})
    }
    this.load()
  }

  showOverlay(id, formType) {
    this.setState({formType: formType, showOverlay: true})
    this.loadDevice(id, formType === 'assign')
  }

  closeOverlay() {
    this.setState({showOverlay: false})
    $('body').css('overflow', 'inherit')
  }

  loadDevice(id, forceAssign = false) {
    $.getJSON('./systemsinventory/system/getDetails', {device_id: id}).done(function (data) {
      if (forceAssign) {
        data.status = Device.userAssigned(data)
          ? '1'
          : '2'
      }
      this.setState({device: data})
    }.bind(this))
  }

  download() {
    const parameters = $.param(this.state.filters)
    const url = './systemsinventory/search/download?' + parameters
    window.location.href = url
  }

  editSwitch(e) {
    e.preventDefault()
    this.closeOverlay()
    this.showOverlay(this.state.device.id, 'edit')
  }

  save() {
    $.ajax({
      url: './systemsinventory',
      data: {},
      dataType: 'json',
      type: 'delete|patch|post|get',
      success: function (data) {}.bind(this),
      error: function (data) {}.bind(this)
    })

    $.post('./systemsinventory/system/', this.state.device, null, 'json').done(function (data) {
      this.closeOverlay()
    }.bind(this)).fail(function (data) {
      console.log(data)
    })
  }

  load() {
    const {
      systemType,
      department,
      location,
      physicalId,
      macAddress,
      purchaseDate,
      model,
      ipAddress,
      username,
      statusType
    } = this.state.filters

    $.getJSON('./systemsinventory/search', {
      statusType,
      systemType,
      department,
      location,
      physicalId,
      macAddress,
      purchaseDate,
      model,
      ipAddress,
      username,
      sort: this.state.sort.direction !== 0
        ? this.state.sort
        : null,
      offset: this.offset
    }).done(function (data) {
      if (data.listing !== undefined) {
        if (this.offset === 0 || this.offset === -1) {
          this.setState({listing: data.listing, total: data.total, shown: data.shown, more: data.more, restricted: data.restricted})
        } else if (this.offset > 0) {
          this.setState({
            listing: this.state.listing.concat(data.listing),
            shown: data.shown,
            total: data.total,
            restricted: data.restricted,
            more: data.more
          })
        }
      }
    }.bind(this))
  }

  delete() {
    $.ajax({
      url: 'systemsinventory/system/device',
      data: {
        device_id: this.state.device.id
      },
      dataType: 'json',
      type: 'delete',
      success: function () {
        this.closeOverlay()
        this.load()
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  assign() {
    $.ajax({
      url: './systemsinventory/system/assign',
      data: this.state.device,
      dataType: 'json',
      type: 'patch',
      success: function () {
        this.closeOverlay()
        this.load()
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  unassign() {
    $.ajax({
      url: './systemsinventory/system/unassign',
      data: {
        device_id: this.state.device.id
      },
      dataType: 'json',
      type: 'patch',
      success: function () {
        this.closeOverlay()
        this.load()
      }.bind(this),
      error: function () {}.bind(this)
    })
  }

  reset() {
    let filters = this.state.filters
    filters.department = 0
    filters.location = 0
    filters.statusType = 0
    filters.physicalId = ''
    filters.macAddress = ''
    filters.purchaseDate = ''
    filters.model = ''
    filters.ipAddress = ''
    filters.username = ''
    this.setState({filters: filters})
    this.load()
  }

  updateSystemType(type) {
    let {systemType} = this.state.filters
    if (type === 'all') {
      systemType = ['all']
    } else {
      const indexOf = $.inArray(type, systemType)
      if (indexOf === -1) {
        if (systemType[0] === 'all') {
          systemType = []
        }
        systemType.push(type)
      } else if (systemType.length > 0) {
        systemType.splice(indexOf, 1)
      }
    }
    this.updateFilter('systemType', systemType)
  }

  updateFilter(varname, value) {
    let filters = this.state.filters
    filters[varname] = value
    this.setState({filters: filters})
    this.load()
  }

  updateSelectFilter(varname, value) {
    if (value === null) {
      value = ''
    }
    this.updateFilter(varname, value.value)
  }

  openModal() {
    this.setState({modalOpen: true})
  }

  closeModal() {
    this.setState({modalOpen: false})
  }

  incrementOffset() {
    this.offset = this.offset + 1
    this.load()
  }

  maxOffset() {
    this.offset = -1
    this.load()
  }

  toggleSort(type) {
    const sort = this.state.sort
    if (sort.column !== type) {
      sort.column = type
      sort.direction = 1
    } else {
      if (sort.direction === 0) {
        sort.direction = 1
      } else if (sort.direction === 1) {
        sort.direction = -1
      } else {
        sort.direction = 0
      }
    }
    this.setState({sort: sort})
    this.load()
  }

  render() {
    let moreButtons
    if (this.state.more) {
      moreButtons = (
        <div>
          <button className="btn btn-default" onClick={this.incrementOffset}>Show more</button>
          <button className="btn btn-default" onClick={this.maxOffset}>Show all</button>
        </div>
      )
    }
    let modal
    if (this.state.modalOpen) {
      modal = <Modal
        style={modalCss}
        effect={Effect.FlipHorizontal3D}
        onRequestClose={this.closeModal}
        open={this.state.modalOpen}><Filters
        filters={this.state.filters}
        options={jsonFilters}
        update={this.updateFilter}
        reset={this.reset}
        close={this.closeModal}/></Modal>
    }
    let overlay
    let formType
    let overlayTitle

    if (this.state.showOverlay && this.state.device !== undefined) {
      switch (this.state.formType) {
        case 'edit':
          overlayTitle = `Update device ${this.state.device.physical_id}`
          formType = <DeviceForm
            save={this.save}
            options={jsonFilters}
            update={this.updateDeviceValue}
            device={this.state.device}/>
          break

        case 'assign':
          overlayTitle = `Assign device ${this.state.device.physical_id}`
          formType = <AssignForm
            edit={this.editSwitch}
            update={this.updateDeviceValue}
            device={this.state.device}
            options={jsonFilters}
            errors={this.errors}
            assign={this.assign}/>
          break

        case 'unassign':
          overlayTitle = `Unassign device ${this.state.device.physical_id}`
          formType = <UnassignDevice
            device={this.state.device}
            unassign={this.unassign}
            close={this.closeOverlay}/>
          break

        case 'delete':
          overlayTitle = `Delete device ${this.state.device.physical_id}`
          formType = <DeleteDevice
            device={this.state.device}
            delete={this.delete}
            close={this.closeOverlay}/>
          break

        case 'view':
          overlayTitle = `View device ${this.state.device.physical_id}`
          formType = <ViewDevice device={this.state.device} />
          break
      }

      overlay = (
        <Overlay close={this.closeOverlay} title={overlayTitle}>
          {formType}
        </Overlay>
      )
    }

    let statusSelection
    if (!this.state.restricted) {
      statusSelection = (
        <div className="col-sm-6 marginBottom">
          <StatusSelection
            update={this.updateFilter}
            active={this.state.filters.statusType}/>
        </div>
      )
    }
    return (
      <div>
        {modal}
        {overlay}
        <div className="row">
          <div className="col-sm-12 marginBottom">
            <SystemSelection
              update={this.updateSystemType}
              jsonFilters={jsonFilters}
              active={this.state.filters.systemType}/>
          </div>
          {statusSelection}

          <div className="col-sm-6 marginBottom">
            <button className="btn btn-primary" onClick={this.openModal}>More filters</button>
            {this.state.listing !== null && this.state.listing.length > 0
              ? <button className="btn btn-info marginLeft" onClick={this.download}>
                  <i className="fa fa-download"></i>
                  Download</button>
              : null}
            <button className="btn btn-default marginLeft" onClick={this.reset}>Reset filters</button>
          </div>
        </div>
        <div className="alert alert-info">
          Devices shown: {`${this.state.shown} rows of ${this.state.total}`}
        </div>
        <Listing
          showOverlay={this.showOverlay}
          rows={this.state.listing}
          update={this.updateFilter}
          updateSelect={this.updateSelectFilter}
          filters={this.state.filters}
          toggleSort={this.toggleSort}
          options={jsonFilters}
          sort={this.state.sort}/> {moreButtons}
      </div>
    )
  }
}
