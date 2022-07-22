import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModal);
  }

  handleModal = e => {
    if (e.code === 'Escape') {
      this.props.showModal();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdrop}>
        <div className={styles.modal}>
          <img src={this.props.largeImg} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
