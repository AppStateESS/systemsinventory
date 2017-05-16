'use strict'
import React, {Component} from 'react'
import Filters from './Filters.jsx'
import Listing from './Listing.jsx'
import SystemSelection from './SystemSelection.jsx'
import {Modal, Effect} from 'react-dynamic-modal'
/* global $, jsonFilters */

const modalCss = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999999,
    overflow: 'hidden',
    perspective: 1300,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  content: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    margin: '0px',
    width: '30%',
    padding: '8px',
    border: '1px solid rgba(0, 0, 0, .2)',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: '0 5px 10px rgba(0, 0, 0, .3)'
  }
}

export default class Search extends Component {
  constructor() {
    super()
    this.offset = 0
    this.filters = this.state = {
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
      total: 0,
      shown: 0,
      more: false,
      listing: null
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.updateSystemType = this.updateSystemType.bind(this)
    this.load = this.load.bind(this)
    this.reset = this.reset.bind(this)
    this.incrementOffset = this.incrementOffset.bind(this)
    this.maxOffset = this.maxOffset.bind(this)
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
    $.getJSON('./systemsinventory/', {
      systemType,
      department,
      location,
      physicalId,
      macAddress,
      purchaseDate,
      model,
      ipAddress,
      username,
      offset: this.offset
    }).done(function (data) {
      if (data.listing !== undefined) {
        if (this.offset === 0 || this.offset === -1) {
          this.setState({listing: data.listing, total: data.total, shown: data.shown, more: data.more})
        } else if (this.offset > 0) {
          this.setState({
            listing: this.state.listing.concat(data.listing),
            shown: data.shown,
            total: data.total
          })
        }
      }
    }.bind(this))
  }

  reset() {
    let filters = this.state.filters
    filters.department = null
    filters.location = null
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
        effect={Effect.Newspaper}
        onRequestClose={this.closeModal}
        open={this.state.modalOpen}><Filters
        filters={this.state.filters}
        options={jsonFilters}
        update={this.updateFilter}
        reset={this.reset}/></Modal>
    }
    return (
      <div>
        {modal}
        <SystemSelection
          update={this.updateSystemType}
          jsonFilters={jsonFilters}
          active={this.state.filters.systemType}/>
        <div className="filter-button">
          <button className="btn btn-primary" type="button" onClick={this.openModal}>Search filters
          </button>
        </div>
        Devices shown: {this.state.shown}&nbsp;rows of {this.state.total}
        <Listing rows={this.state.listing}/> {moreButtons}
      </div>
    )
  }
}
