import React from 'react';
import Modal from 'react-modal';
import Currency from 'react-currency-format';

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                  : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const ModalDetailPenjualan = (props) => {
  const { DetailPenjualans, show, closeModal} = props
  return (
    <Modal
      isOpen={show}
      style={modalStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true} 
      shouldCloseOnEsc={true}
    >
      <button onClick={() => closeModal()}  className="btn btn-danger">Close </button>
      <table className="table table-bordered">
        <thead>
          <th>No Trans</th>
          <th>Produk</th>
          <th>Harga Jual</th>
          <th>Jumlah</th>
          <th>Subtotal</th>
          <th>Diskon</th>
          <th>Total Akhir</th>
        </thead>
        <tbody>
          {
            DetailPenjualans.map((data) => {
              return (
                <tr>
                  <td>{ data.no_trans}</td>
                  <td>{ data.Produk.nama}</td>
                  <td>
                    <Currency
                      value={data.harga_jual}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.jumlah}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.subtotal}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.diskon}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                  <td>
                    <Currency
                      value={data.total_akhir}
                      displayType={'text'}
                      thousandSeparator={true}
                     />
                  </td>
                </tr>
              )

            })
          }

        </tbody>
      </table>

    </Modal>
  )

}

export default ModalDetailPenjualan
