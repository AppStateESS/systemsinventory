import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, ModalManager, Effect} from 'react-dynamic-modal'

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

export default class FilterModal extends Component {
  // see Search:openModal
  constructor(props) {
    super(props)
  }

  render() {
    const {onRequestClose, content} = this.props
    return (
      <Modal
        style={modalCss}
        onRequestClose={onRequestClose}
        effect={Effect.RotateFromLeft3D}>
        <div>
          {content}
        </div>
      </Modal>
    )
  }
}
FilterModal.propTypes = {
  onRequestClose: PropTypes.func,
  content: PropTypes.element,
  close: PropTypes.func
}
