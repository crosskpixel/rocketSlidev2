import React from 'react';
import Modal from 'react-responsive-modal';
import './custom-styling.css';

export default class ModalLoading extends React.Component {
  state = {
    open: false,
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
        >
            <div className="load-3">
                Conectando&nbsp;    
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </Modal>
      </div>
    );
  }
}