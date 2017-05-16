'use strict'
import React, {Component} from 'react'
import FilterModal from './FilterModal.jsx'
import Filters from './Filters.jsx'
import Listing from './Listing.jsx'
import SystemSelection from './SystemSelection.jsx'
import {ModalManager} from 'react-dynamic-modal'

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
      total: 0,
      shown : 0,
      more: false,
      listing: null,
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
          this.setState({listing : this.state.listing.concat(data.listing), shown:data.shown, total: data.total})
        }
      }
    }.bind(this))
  }

  reset() {
    const filters = {
      systemType: [],
      department: null,
      location: null,
      physicalId: '',
      macAddress: '',
      purchaseDate: '',
      model: '',
      ipAddress: '',
      username: ''
    }
    this.setState({filters: filters})
    this.openModal()
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
    const filters = <Filters filters={this.state.filters} options={jsonFilters} update={this.updateFilter} reset={this.reset}/>
    ModalManager.open(<FilterModal
      content={filters}
      refresh={this.load}
      close={this.closeModal}
      onRequestClose={() => true}/>)
  }

  closeModal() {
    ModalManager.close()
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
    return (
      <div>
        <SystemSelection
          update={this.updateSystemType}
          jsonFilters={jsonFilters}
          active={this.state.filters.systemType}/>
        <div className="filter-button">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.openModal}>Search filters
          </button>
        </div>
        Devices shown: {this.state.shown} rows of {this.state.total}
        <Listing rows={this.state.listing}/> {moreButtons}

      </div>
    )
  }
}
