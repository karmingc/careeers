/** @jsx jsx */
import React from 'react';
import Modal from 'react-modal';
import { jsx } from '@emotion/core';

const customStyles = {
  content: {
    left: '50%',
    right: 'auto',
    bottom: '0',
    marginRight: '-50%',
    transform: 'translate(-50%)',
    background: 'none',
    padding: 'none',
    border: 'none'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.85)'
  }
};

Modal.setAppElement('#root');

/**
 * Modal props
 */
export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = React.memo(function ModalImpl(
  props
) {
  const { isOpen, closeModal, children } = props;
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        {children}
      </Modal>
    </React.Fragment>
  );
});

export default ModalComponent;
