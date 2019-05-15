'use strict'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'

export default class UserSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empty: false,
            value: '',
            suggestions: []
        }
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
        this.onChange = this.onChange.bind(this)
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this)
        this.getSuggestions = this.getSuggestions.bind(this)
        this.getSuggestionValue = this.getSuggestionValue.bind(this)
        this.renderSuggestion = this.renderSuggestion.bind(this)
    }
    
    onChange(e, value) {
        // look up user
        if (value.newValue.length > 0) {
            this.setState({empty: false})
        }
        this.setState({
            value: value.newValue
        })
        
    }
    
    renderSuggestion(suggestion, active) {
        return(
        <div>
        {suggestion.firstName}&nbsp;{suggestion.lastName}({suggestion.userName})
        </div>)
    }

    getSuggestionValue(suggestion) {
        return suggestion.userName
    }
    
    getSuggestions(value) {
        $.getJSON('./systemsinventory/system/searchUser', {username: value}).done(function (data) {
        this.setState({suggestions: data})
        }.bind(this))
       
        return result
    }

    onSuggestionsFetchRequested(value){
        $.getJSON('./systemsinventory/system/searchUser', {username: value.value}).done(function (data) {
        this.setState({suggestions: data})
        }.bind(this))
        
    }
    
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        })
    }
    
    onSuggestionSelected(e, suggestion){
        let namevar = 'tst'
        $.getJSON('./systemsinventory/system/getUser', {username: suggestion.suggestionValue}).done(function (data) {
                this.props.setName(data)
        }.bind(this))
    }
   
    shouldRenderSuggestions(value) {
        let show = value.trim().length > 2
        return show
    }
    
    emptyMessage() {
        if (this.props.label.length > 0) {
        return this.props.label + ' may not be empty'
        } else {
        return 'Field may not be empty'
        }
    }
        
    render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
        
    let errorMessage
        if (this.props.errorMessage) {
    errorMessage = this.props.errorMessage
        } else if (this.state.empty && this.props.required && this.props.disableRequireCheck === false) {
    errorMessage = this.emptyMessage()
        }
        
    let inputClass
        if ((this.props.errorMessage !== null && this.props.errorMessage !== '') || (this.state.empty && this.props.required && this.props.disableRequireCheck === false)) {
    inputClass = 'form-control error-highlight'
        } else {
    inputClass = 'form-control'
        }
    const inputProps = {
      placeholder: 'Search by username',
      value: this.state.value ? this.state.value : this.props.value,
      onChange: this.onChange,
      className: inputClass
    };

    let required = this.props.required ? <span>&nbsp;<i className="fa fa-asterisk text-danger"></i></span> : null
    
    return (
      <div className="form-group">
        {this.props.label.length > 0
            ? <label htmlFor={this.props.id}>{this.props.label} {required}</label> : undefined}
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
      />
      {errorMessage
        ? <div className="label label-danger">{errorMessage}</div>
        : null}
      </div>
    );
  }
  
}

const theme = {
  container: {
    position: 'relative'
  },
    inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
  };

UserSearch.defaultProps = {
label: '',
        type: 'text',
        name: '',
        value: '',
        change: null,
        blur: null,
        required: false,
        id: null,
        autocomplete: false,
        placeholder: null,
        errorMessage: '',
        disabled: false,
        size: null,
        maxLength: null,
        selectOnClick: false,
        wrap: null,
        onEmpty: null,
        flagEmpty: true,
        disableRequireCheck: false,
}

UserSearch.propTypes = {
name: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        change: PropTypes.func,
        blur: PropTypes.func,
        placeholder: PropTypes.string,
        errorMessage: PropTypes.string,
        iid: PropTypes.string,
        autocomplete: PropTypes.bool,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        size: PropTypes.number,
        maxLength: PropTypes.number,
        wrap: PropTypes.func,
        selectOnClick: PropTypes.bool,
        onEmpty: PropTypes.func,
        flagEmpty: PropTypes.bool,
        disableRequireCheck: PropTypes.bool,
}
export const RequiredIcon = () => {
    return <i className="fa fa-asterisk text-danger"></i>
}

