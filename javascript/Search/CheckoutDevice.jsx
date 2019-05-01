'use strict'
import React from 'react'
import Base from '../DeviceForms/Base.jsx'

export default class CheckoutDevice extends Base {
  constructor(props) {
    super(props)
    this.state = {
        user: {
            first_name: "",
            last_name: "",
            username: ""
        },
        notes: ""
    }
    this.updateName = this.updateName.bind(this) 
    this.checkout = this.checkout.bind(this)
    this.validateUser = this.validateUser.bind(this)
    this.setNotes = this.setNotes.bind(this)
  }

  updateName(name){
      this.setState({
          user: {
            first_name: name.firstName,
            last_name: name.lastName,
            username: name.userName
        }
      })
      
  }

  setNotes(e){
      this.setState({notes: e.target.value})
  }
  
  checkout() {
    this.props.checkout(this.state.user, this.state.notes)
  }

  validateUser(){
      const user = Object.values(this.state.user)
      let empty = false
      user.forEach(function (item) {
          if(!item || item.length == 0){
              empty = true
          }
      })
      return empty
    
  }

  render() {
    const {device, update} = this.props
    let disabled = this.validateUser()
    return (
      <div>
        <div className="row">
        <div className="col-sm-4">
            {this.userSearch('username', 'Username', false, '', '', true)}
          </div>          
          <div className="col-sm-4">
            {this.inputField('first_name', 'First Name', false, '', this.state.user.first_name ? this.state.user.first_name : '', true)}
          </div>
          <div className="col-sm-4">
            {this.inputField('last_name', 'Last Name', false, '', this.state.user.last_name ? this.state.user.last_name : '', true)}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label>Notes</label>
            <textarea
              className="form-control"
              onBlur={this.setNotes.bind(this)}/>
          </div>
        </div>
        <div className="text-center">
          <button
            className="marginTop btn btn-lg btn-primary"
            onClick={this.checkout}
            disabled={disabled}>Checkout Device</button>
        </div>
      </div>
    )
  }
}
