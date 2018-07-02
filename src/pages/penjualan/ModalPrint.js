import React from 'react';
import Modal from 'react-modal';
import ReactToPrint from "react-to-print";
import Print from './Print'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                  : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class ModalPrint extends React.Component {

  render() {
    const { show, penjualan, closeModal } = this.props
    return (
        <Modal
          isOpen={show}
          style={customStyles}
        >
          <ReactToPrint
            trigger={() => <a href="#" className="btn btn-primary"><i className="fas fa-print"></i> Print</a>}
            content={() => this.componentRef} />
          <button onClick={() => closeModal()}  className="btn btn-danger">Close </button>
          <Print  ref={el => (this.componentRef = el)} penjualan={penjualan} />
        </Modal>
    )
  }
}

export default ModalPrint
