'use strict'
import React, {Component} from 'react'
import Filters from './Filters.jsx'
import Listing from './Listing.jsx'
import SystemSelection from './SystemSelection.jsx'
import {Modal, Effect} from 'react-dynamic-modal'
import Overlay from '../Mixin/Overlay.jsx'
import DeviceForm from '../DeviceForm/DeviceForm.jsx'
import modalCss from './ModalCss.js'

/* global $, jsonFilters */

export default class Search extends Component {
  constructor() {
    super()
    this.offset = 0
    this.state = {
      modalOpen: false,
      filters: {
        systemType: [],
        department: null,
        location: null,
        physicalId: '',
        macAddress: '',
        purchaseDate: '',
        model: '',
        ipAddress: '',
        username: ''
      },
      device: {},
      showOverlay: false,
      total: 0,
      shown: 0,
      more: false,
      listing: null,
      sort: {
        column: null,
        direction: 0
      }
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.updateSystemType = this.updateSystemType.bind(this)
    this.load = this.load.bind(this)
    this.reset = this.reset.bind(this)
    this.incrementOffset = this.incrementOffset.bind(this)
    this.maxOffset = this.maxOffset.bind(this)
    this.showOverlay = this.showOverlay.bind(this)
    this.closeOverlay = this.closeOverlay.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.updateSelectFilter = this.updateSelectFilter.bind(this)
    this.download = this.download.bind(this)
    this.updateDeviceValue = this.updateDeviceValue.bind(this)
  }

  showOverlay(id) {
    this.loadDevice(id)
  }

  closeOverlay() {
    this.setState({showOverlay: false})
  }

  loadDevice(id) {
    $.getJSON('./systemsinventory/system/getDetails', {device_id: id}).done(function (data) {
      this.setState({device: data, showOverlay: true})
    }.bind(this))
  }

  download() {
    const parameters = $.param(this.state.filters)
    const url = './systemsinventory/search/download?' + parameters
    window.location.href = url
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
      username
    } = this.state.filters
    $.getJSON('./systemsinventory/search', {
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
          this.setState({listing: data.listing, total: data.total, shown: data.shown, more: data.more})
        } else if (this.offset > 0) {
          this.setState({
            listing: this.state.listing.concat(data.listing),
            shown: data.shown,
            total: data.total,
            more: data.more
          })
        }
      }
    }.bind(this))
  }

  reset() {
    let filters = this.state.filters
    filters.department = 0
    filters.location = 0
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

  updateDeviceValue(varname, value) {
    if (typeof value === 'object') {
      value = value.target.value
    }
    let device = this.state.device
    device[varname] = value
    this.setState({device: device})
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
    if (this.state.showOverlay) {
      overlay = (
        <Overlay close={this.closeOverlay}>
          <DeviceForm
            options={jsonFilters}
            update={this.updateDeviceValue}
            device={this.state.device}/>
        </Overlay>
      )
    }
    return (
      <div>
        {modal}
        {overlay}
        <div className="row">
          <div className="col-md-7 marginBottom">
            <SystemSelection
              update={this.updateSystemType}
              jsonFilters={jsonFilters}
              active={this.state.filters.systemType}/>
          </div>
          <div className="col-md-5 marginBottom">
            <button className="btn btn-primary" onClick={this.openModal}>Search filters</button>
            {this.state.listing !== null && this.state.listing.length > 0 ? <button className="btn btn-info marginLeft" onClick={this.download}><i className="fa fa-download"></i>&nbsp;Download report</button> : null}
            <button className="btn btn-default marginLeft" onClick={this.reset}>Reset filters</button>
          </div>
        </div>
        <div className="alert alert-info">
          Devices shown: {this.state.shown}&nbsp;rows of {this.state.total}
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
